import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcrypt';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          await connectToDB();
          // check if user exists in database
          const user = await User.findOne({ username: credentials.username });
          if (!user) {
            throw new Error('No User Found!');
          }
          // check if password matches
          const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
          // const isValid = credentials.password === user.hashedPassword
          if (!isValid) {
            throw new Error('Incorrect password!')
          }

          return { id: user._id.toString(), name: user.username, email: user.email, image: user.image };
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        // allows signing in with credentials
        if (user) {
          return true;
        }

        await connectToDB();

        // check if a user already exists in mongo database
        const userExists = await User.findOne({ email: profile.email });
        // If no user exists, create new one
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
  },
});

export { handler as GET, handler as POST };
