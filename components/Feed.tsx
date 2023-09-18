'use client';

import React, {
  useState,
  useEffect,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import PromptCard from './PromptCard';

interface Posts {
  _id: string;
  creator: any;
  prompt: string;
  tag: string;
}

interface PromptCardListPropType {
  data: Posts[];
  handleTagClick: MouseEventHandler;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListPropType) => {
  return (
    <div className='prompt_layout mt-16'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // UseStates
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Posts[]>([]);
  // UseEffect Hook
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();

    return () => {};
  }, []);
  // Functions
  const handleSearchChange: ChangeEventHandler = (e) => {};

  return (
    <section className='feed'>
      <form className='flex-center relative w-full'>
        <input
          type='text'
          placeholder='Search tags or username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
