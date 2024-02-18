'use client';

import { CartContext } from '@/app/(front)/_components/CartContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function HeaderCartLink() {
  const { cartProducts } = useContext(CartContext);

  return <Link href='/cart'>Cart ({cartProducts.length})</Link>;
}
