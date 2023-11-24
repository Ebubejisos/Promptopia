import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const POST = async (request, response) => {
  const body = await request.json();
  const { text } = body;
  const userInputWithoutSpaces = text.replace(/\s/g, '');
  const regexPattern = new RegExp(`${userInputWithoutSpaces}`, 'i');
  try {
    await connectToDB();
    let results = await Prompt.find({ tag: { $regex: regexPattern } }).populate('creator');
    if (results.length === 0) {
      const allPrompts = await Prompt.find({}).populate('creator');
      results = allPrompts.filter((prompt) => regexPattern.test(prompt.creator.username))
    }
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}