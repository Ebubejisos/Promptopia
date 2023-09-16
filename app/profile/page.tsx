/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { MouseEventHandler, useEffect, useState } from 'react';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// types
interface Session {
  user: {
    id?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    name?: string | null | undefined;
  };
}
interface Posts {
  _id: string;
  creator: any;
  prompt: string;
  tag: string;
}

const ProfilePage = () => {
  // Hooks
  const { data: session } = useSession();
  //refer to create-prompt page for clarity on why this is done
  const customSession = session as Session;
  const router = useRouter();

  // UseStates
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `/api/users/${customSession?.user.id}/posts`
      );
      const data = await response.json();
      setPosts(data);
    };
    if (customSession?.user.id) fetchPosts();
  }, []);

  // functions
  const handleEdit = (post: Posts) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Posts) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleDelete={() => handleDelete}
      handleEdit={() => handleEdit}
    />
  );
};

export default ProfilePage;
