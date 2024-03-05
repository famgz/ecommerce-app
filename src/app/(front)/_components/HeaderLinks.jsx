'use client';

import { CartContext } from '@/app/(front)/_components/CartContext';
import LoginWithGoogle from '@/app/(front)/_components/buttons/LoginWithGoogle';
import LogOutButton from '@/app/(front)/_components/buttons/LogoutButton';
import { faBagShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useContext, useState } from 'react';

export default function HeaderLinks({ user, isAdmin }) {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { cartProductsIds } = useContext(CartContext);

  return (
    <>
      <Link href='/' className='flex gap-2 text-white'>
        <FontAwesomeIcon icon={faBagShopping} className='size-5' />
        Ecommerce
      </Link>
      <nav className='hidden md:flex gap-3 font-medium text-center'>
        <Link href='/'>Home</Link>
        <Link href='/products'>All products</Link>
        <Link href='/categories'>Categories</Link>
        <Link href='/account'>Account</Link>
        <Link href='/cart'>
          Cart ({cartProductsIds ? cartProductsIds.length : 0})
        </Link>
        {user ? <LogOutButton /> : <LoginWithGoogle />}
        {user && isAdmin && <Link href='/dashboard'>Dashboard</Link>}
      </nav>
      <div className='cursor-pointer px-2'>
        <FontAwesomeIcon icon={faBars} className='size-5 ' />
      </div>
    </>
  );
}
