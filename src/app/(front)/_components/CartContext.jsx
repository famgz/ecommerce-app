'use client';

import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProductsIds, setCartProductsIds] = useState(null);

  // get localStorage cart items on load
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setCartProductsIds(savedProducts);
  }, []);

  // update localStorage cart items on change
  useEffect(() => {
    if (Array.isArray(cartProductsIds)) {
      localStorage.setItem('cart', JSON.stringify(cartProductsIds));
    }
  }, [cartProductsIds]);

  function addProduct(productId) {
    setCartProductsIds((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProductsIds((prev) => {
      const pos = prev.indexOf(productId);
      if (pos === -1) {
        return prev;
      }
      return prev.filter((_, i) => i !== pos);
    });
  }

  function removeAllOfProductId(productId) {
    setCartProductsIds((prev) => prev.filter((pId) => pId !== productId));
  }

  function clearCart() {
    console.log('clearing cart');
    setCartProductsIds([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartProductsIds,
        setCartProductsIds,
        addProduct,
        removeProduct,
        removeAllOfProductId,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
