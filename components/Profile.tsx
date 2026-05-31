import React, { MouseEventHandler } from 'react';

import PromptCard from './PromptCard';
import Image from 'next/image';

// typescript types
interface Post {
  _id: string;
  creator: any;
  prompt: string;
  tag: string;
}
interface PropType {
  name?: string;
  desc?: string;
  data: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[] | null | undefined>>;
  handleEdit?: (arg: Post) => void;
  handleDelete?: (arg: Post) => void;
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }: PropType) => {
  return (
    <>
      <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='prompt_layout mt-10'>
          {data.length === 0 ? (
            <>
              <Image
                className='h-8 w-8 animate-spin text-slate-500'
                src={'/assets/icons/loader.svg'}
                width={32}
                height={32}
                alt={'loader-icon'}
              />
            </>
          ) : (
            data.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleEdit={() => handleEdit && handleEdit(post)}
                handleDelete={() => handleDelete && handleDelete(post)}
                setPosts={function (value: React.SetStateAction<Post[]>): void {
                  throw new Error('Function not implemented.');
                }}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
