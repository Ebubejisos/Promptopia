import Prompt from '@models/prompt';
import User from '@models/user';

import { connectToDB } from '@utils/database';

export const POST = async (request, response) => {
  const body = await request.json();
  const { text } = body;
  const regexPattern = new RegExp(`\\b${text}\\b`, 'i');
  try {
    await connectToDB();
    const results = await Prompt.find({ tag: { $regex: regexPattern } }).populate('creator');
    if (results === null) {
      results = await User.find({ username: { $regex: regexPattern } });
    }
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}