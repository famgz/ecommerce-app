'use client';

import { signIn } from 'next-auth/react';

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn('google')}
      className='bg-white py-2 px-4 rounded-lg'
    >
      Login with Google
    </button>
  );
}
