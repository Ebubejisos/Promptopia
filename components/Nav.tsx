'use client';

import { MouseEventHandler } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn: boolean = true;
  const handleSignOut: MouseEventHandler = async (e) => {
    e.preventDefault();

    await signOut();
  };

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
      <Link href='/' className='flex-center flex gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button
              type='button'
              onClick={handleSignOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src='/assets/images/empty_avatar.cedf234c.png'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Nav;
