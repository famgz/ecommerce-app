'use client';

import { CartContext } from '@/app/(front)/_components/CartContext';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

export default function AddToCartButton({
  product,
  showText = true,
  className = '',
}) {
  const { cartProductsIds, setCartProductsIds } = useContext(CartContext);

  function handleAddToCart() {
    setCartProductsIds((prev) => [...prev, product._id]);
  }

  return (
    <button className={'btn-primary ' + className} onClick={handleAddToCart}>
      <FontAwesomeIcon icon={faCartShopping} className='size-4' />
      {showText && <span>Add to Cart</span>}
    </button>
  );
}
