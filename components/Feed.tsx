'use client';

import React, {
  useState,
  useEffect,
  FormEventHandler,
  MouseEventHandler,
} from 'react';
import PromptCard from './PromptCard';
import Image from 'next/image';

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
  const [isSearching, setIsSearching] = useState<boolean>(false);
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
  const handleSearch: FormEventHandler = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const response = await fetch('/api/search-prompts', {
        method: 'POST',
        body: JSON.stringify({
          text: searchText,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        console.table(posts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className='feed'>
      <form className='flex-center relative w-full' onSubmit={handleSearch}>
        <input
          type='text'
          placeholder='Search tags or username'
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          required
          className='search_input peer'
        />
        <button
          type='submit'
          className='-translate-x-6 cursor-pointer self-center'
          disabled={isSearching ? true : false}
        >
          <Image
            className='h-4 w-4'
            src={'/assets/icons/magnify.svg'}
            width={10}
            height={10}
            alt={'search-icon'}
          />
        </button>
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
