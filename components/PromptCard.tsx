'use client';

import { MouseEventHandler, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

// types
interface PropType {
  post: {
    _id: string;
    creator: any;
    prompt: string;
    tag: string;
  };
  handleTagClick?: MouseEventHandler;
  handleEdit?: MouseEventHandler;
  handleDelete?: MouseEventHandler;
}
interface Session {
  user: {
    id?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    name?: string | null | undefined;
  };
}

// React Component
const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PropType) => {
  // Hooks
  const pathName = usePathname();
  const { data: session } = useSession();
  const customSession = session as Session;
  const [copied, setCopied] = useState('');

  // functions
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };

  return (
    <>
      <div className='prompt_card'>
        <div className='flex items-start justify-between gap-5'>
          <div className='flex flex-1 cursor-pointer items-center justify-start gap-3'>
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {post.creator.username}
              </h3>
              <p className='font-inter text-sm text-gray-500'>
                {post.creator.email}
              </p>
            </div>
          </div>
          <div className='copy_btn' onClick={handleCopy}>
            <Image
              src={
                copied === post.prompt
                  ? '/assets/icons/tick.svg'
                  : '/assets/icons/copy.svg'
              }
              alt=''
              width={12}
              height={12}
              title={copied === post.prompt ? 'copied!' : 'copy prompt'}
            />
          </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
        <p
          className='blue_gradient cursor-pointer font-inter text-sm'
          onClick={() => handleTagClick}
        >
          {' '}
          {post.tag}
        </p>

        {customSession?.user.id === post.creator._id &&
          pathName === '/profile' && (
            <div className='flex-center mt-5 gap-4 border-t border-gray-100 pt-3'>
              <p
                className='green_gradient cursor-pointer font-inter text-sm'
                onClick={handleEdit}
              >
                Edit
              </p>
              <p
                className='orange_gradient cursor-pointer font-inter text-sm'
                onClick={handleDelete}
              >
                Delete
              </p>
            </div>
          )}
      </div>
    </>
  );
};

export default PromptCard;
