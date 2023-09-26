import { NextResponse } from 'next/server'

import User from '@models/user';
import { connectToDB } from '@utils/database';


export const POST = async (request) => {
  const body = await request.json();
  const { username, email, password } = body;
  // checks for any omitted fields
  if (!username || !password) {
    return new NextResponse('Missing Fields', { status: 400 })
  }
  try {
    await connectToDB();
    // check if user exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw new Error('User already exists!')
    }
    // create a new user in database
    const newUser = new User({
      username: username.replace(' ', '').toLowerCase(),
      email: email.replace(' ', '').toLowerCase(),
      hashedPassword: password,
    });
    await newUser.save();

    return NextResponse.json(newUser);
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to create user!', { status: 500 })
  }
}