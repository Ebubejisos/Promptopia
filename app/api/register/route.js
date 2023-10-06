import { NextResponse } from 'next/server'

import User from '@models/user';
import { connectToDB } from '@utils/database';
import bcrypt from 'bcrypt';


export const POST = async (request) => {
  const body = await request.json();
  const { username, email, password } = body;
  // checks for any omitted fields
  if (username === '' || email === '' || password === '') {
    return new NextResponse(JSON.stringify('Missing fields!'), { status: 400 })
  }
  try {
    await connectToDB();
    // check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return new NextResponse(JSON.stringify('User already exists!'), { status: 409 });
    }
    // create a new user in database
    const defaultImage = 'https://www.iconpacks.net/icons/5/free-icon-no-profile-picture-man-15282.png';
    const newUser = new User({
      email: email.replace(' ', '').toLowerCase(),
      username,
      image: defaultImage,
      hashedPassword: await bcrypt.hash(password, 10),
    });
    await newUser.save();

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}