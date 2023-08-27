import { connectToDB } from '@utils/database';

interface Request {
  json: () =>
    PromiseLike<{ userId: string; prompt: string; tag: string }>
    | { userId: string; prompt: string; tag: string };
}
export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
  } catch (error) {
    console.error(error)
  }
};
