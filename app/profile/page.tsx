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

  // useEffect
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
    const hasConfirmed: boolean = confirm(
      'Are you sure you want to delete this prompt ?'
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });

        const filteredPosts: Posts[] = posts.filter(
          (el) => el._id !== post._id
        );
        setPosts(filteredPosts);

        router.push('./');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default ProfilePage;
