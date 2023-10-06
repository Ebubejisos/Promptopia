'use client';

import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Link from 'next/link';
import Image from 'next/image';
import Mask from '@components/Mask';

// typescript types
interface UserData {
  name: string;
  email: string;
  password: string;
  Cpassword: string;
}
// COMPONENT
const SignUp = () => {
  // Hooks
  const router = useRouter();
  // useStates
  const [data, setData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    Cpassword: '',
  });
  const [isMasked, setIsMasked] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  // FUNCTION
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast.success('Registered successfully');
        router.push('/login');
      } else {
        const data = await response.json();
        toast.error(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occured');
    } finally {
      setPending(false);
    }
  };

  const handleMaskPassword = () => {
    setIsMasked((prev) => !prev);
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
            Register an account
          </h2>
        </div>
        {/* continue with google */}
        <div className='mt-3'>
          <button
            type='button'
            className='flex w-full justify-center rounded border-2 bg-transparent px-3 py-1.5  text-center text-sm text-gray-800 hover:border-gray-600 hover:bg-slate-200'
            onClick={() => signIn('google', { callbackUrl: '/' })}
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
            {/* USERNAME */}
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
                  value={data.name}
                  // required
                  className='rounded px-3 py-1 text-sm text-gray-500 outline-none'
                  autoFocus
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-3 text-gray-900'
              >
                Email
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={data.email}
                  // required
                  className='rounded px-3 py-1 text-sm text-gray-500 outline-none'
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            {/* PASSWORD */}
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
                  value={data.password}
                  // required
                  className='rounded px-3 py-1 text-sm text-gray-500 outline-none'
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Confirm Password */}
            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='Cpassword'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Confirm Password
                </label>
              </div>
              <div className='mt-1 flex'>
                <input
                  id='Cpassword'
                  name='Cpassword'
                  type={isMasked ? 'password' : 'text'}
                  value={data.Cpassword}
                  // required
                  className={`rounded px-3 py-1 text-sm text-gray-500 outline-none ${
                    data.password === data.Cpassword && data.password != ''
                      ? 'border-2 border-green-500'
                      : 'border-2 border-red-500'
                  }`}
                  onChange={(e) =>
                    setData({ ...data, Cpassword: e.target.value })
                  }
                />
                <Mask isMasked={isMasked} handleClick={handleMaskPassword} />
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500'
                disabled={pending ? true : false}
              >
                {pending ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              sign-in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
