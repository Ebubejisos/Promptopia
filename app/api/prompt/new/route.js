import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
  // these 3 values will be obtained from a POST request sent from the front end i.e from our create prompt route to this backend api route
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    // saves the newly created prompt to the mongodb database
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response("Failed to create a new prompt", { status: 500 })
  }
};
