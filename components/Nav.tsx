/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { MouseEventHandler } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';
import { useRouter } from 'next/navigation';

type provider = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
>;

const Nav = () => {
  // Hooks
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();

  // UseStates
  const [providers, setProviders] = useState<provider | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  // functions
  const handleSignOut: MouseEventHandler = async () => {
    await signOut();
    if (!session?.user) router.push('/');
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await getProviders();
        setProviders((prev) => {
          console.log(response);
          return response;
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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
              onClick={handleSignOut}
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
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
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
                  onClick={async () => {
                    setToggleDropdown(false);
                    await signOut();
                    if (!session?.user) router.push('/');
                  }}
                  className='black_btn mt-5 w-full'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
