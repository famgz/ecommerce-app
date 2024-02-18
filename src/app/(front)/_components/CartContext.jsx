'use client';

import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  // get localStorage cart items on load
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedProducts?.length === 0) {
      return;
    }
    setCartProducts(savedProducts);
  }, []);

  // update localStorage cart items on change
  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
}
