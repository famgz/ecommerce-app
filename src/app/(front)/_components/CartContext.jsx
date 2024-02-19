'use client';

import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProductsIds, setCartProductsIds] = useState([]);

  // get localStorage cart items on load
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedProducts?.length === 0) {
      return;
    }
    setCartProductsIds(savedProducts);
  }, []);

  // update localStorage cart items on change
  useEffect(() => {
    if (cartProductsIds?.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProductsIds));
    }
  }, [cartProductsIds]);

  return (
    <CartContext.Provider
      value={{
        cartProductsIds,
        setCartProductsIds,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
