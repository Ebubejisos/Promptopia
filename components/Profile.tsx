import React, { MouseEventHandler } from 'react';

import PromptCard from './PromptCard';

interface PropType {
  name?: string;
  desc?: string;
  data: {
    _id: string;
    creator: any;
    prompt: string;
    tag: string;
  }[];
  handleEdit?: MouseEventHandler;
  handleDelete?: MouseEventHandler;
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
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
