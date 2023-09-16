import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      // assesses the dynamic route(i.e[id] in file structure) in other to fetch only posts specific to the currently logged in user
      creator: params.id
    }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch prompts", { status: 500 })

  }
}