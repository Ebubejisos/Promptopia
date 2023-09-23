'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { FormEventHandler } from 'react';

const Login = () => {
  // FUNCTION
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-1 py-6 lg:px-2'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <Image
            src='/assets/images/logo.svg'
            alt='Promptopia Logo'
            width={5}
            height={5}
            className='mx-auto h-16 w-16'
          />
          <h2 className='mt-5 text-center text-2xl font-bold leading-5 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        {/* continue with google */}
        <div className='mt-3'>
          <button
            type='button'
            className='flex w-full justify-center rounded border-2 bg-transparent px-3 py-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-400'
            onClick={() => signIn('google')}
          >
            or Continue with
            <span className='mx-2'>
              <Image
                src='/assets/images/google.svg'
                alt='Google Logo'
                width={5}
                height={5}
                className='mx-auto h-6 w-6'
              />
            </span>
            Google
          </button>
        </div>

        <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-3 text-gray-900'
              >
                Username
              </label>
              <div className='mt-1'>
                <input
                  id='username'
                  name='username'
                  type='text'
                  required
                  className='rounded px-3 py-1 text-sm text-gray-500 outline-none'
                  autoFocus
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  className='rounded px-3 py-1 text-sm text-gray-500 outline-none'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Don&#180;t have an account?{' '}
            <Link
              href='/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              sign-up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
