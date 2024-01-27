'use client'

import {signIn, signOut} from 'next-auth/react'

export default function LoginWithGoogle(params) {
  return (
    <button 
    onClick={() => signIn('google', {redirect: true, callbackUrl: '/'})}
    className='bg-white py-2 px-4 rounded-lg'>
      Login with Google
    </button>
  )
};
