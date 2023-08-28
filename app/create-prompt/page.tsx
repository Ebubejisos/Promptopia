'use client';

import { useSession } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

interface Session {
  user: {
    id?: string | null | undefined;
    email: string | null | undefined;
    image: string | null | undefined;
    name: string | null | undefined;
  };
}
interface Post {
  prompt: string;
  tag: string;
}

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: '',
    tag: '',
  });

  const createPrompt: FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // a little type manipulation in order to use "user.id" which is not available in the data returned from useSession to avoid breaking code
      const customSession = session as Session;

      // sends POST request to our api route with the current userId, prompt and tag obtained from user form input to be saved to our database
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: customSession?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
