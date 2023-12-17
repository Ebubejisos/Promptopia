/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const Nav = () => {
  // Hooks
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  // UseStates
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  // sideEffects

  return (
    <nav className='flex-between mb-16 w-full pt-3'>
      <Link href='/' className='flex-center flex gap-2'>
        <Image
          src='/assets/images/logo.svg'
          alt='Promptopia Logo'
          width={30}
          height={30}
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='hidden sm:flex'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>

            <button
              type='button'
              onClick={() => signOut({ callbackUrl: '/' })}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            <button
              type='button'
              onClick={() => router.push('/login')}
              className={
                pathName === '/login' || pathName === '/register'
                  ? 'hidden'
                  : 'black_btn'
              }
            >
              Sign In
            </button>
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='relative flex sm:hidden'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image as string}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className={
                    pathName === '/login' || pathName === '/register'
                      ? 'hidden'
                      : 'black_btn mt-5 w-full'
                  }
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type='button'
              onClick={() => router.push('/login')}
              className='black_btn'
            >
              Sign In
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
