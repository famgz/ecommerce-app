'use client';

import { CartContext } from '@/app/(front)/_components/CartContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export default function AddToCartButton({ product, showText = true }) {
  const { cartProducts, setCartProducts } = useContext(CartContext);

  function handleAddToCart() {
    setCartProducts((prev) => [...prev, product]);
  }

  return (
    <button className='btn-primary' onClick={handleAddToCart}>
      <FontAwesomeIcon icon={faCartShopping} className='size-4' />
      {showText && <span>Add to Cart</span>}
    </button>
  );
}
