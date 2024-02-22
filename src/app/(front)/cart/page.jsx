'use client';

import { CartContext } from '@/app/(front)/_components/CartContext';
import CartProductsTable from '@/app/(front)/_components/CartProductsTable';
import { parseCheckoutForm } from '@/app/_libs/utils';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartContext = useContext(CartContext);
  const { cartProductsIds } = cartContext;
  const [fetchedApiProducts, setFetchedApiProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    postalCode: '',
    streetAddress: '',
    country: '',
  });

  let total = 0;
  products.forEach((p) => {
    total += p.price * p.quantity;
  });

  // get cartProducts information
  useEffect(() => {
    async function fetchProductsInfo() {
      // first run, fetch products on DB once cart items are available
      // a single fetch is enough since you cannot add new items to cart
      // products prices could be double checked before submit
      if (!fetchedApiProducts) {
        await axios
          .post('/api/cart', cartProductsIds)
          .then((res) => res.data)
          .then((data) =>
            data.map((p) => ({
              ...p,
              quantity: getProductsQuantity(p._id),
            }))
          )
          .then((parsedProducts) => {
            setProducts(parsedProducts);
            setFetchedApiProducts(true);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setProducts((prev) =>
          prev
            .map((p) => ({
              ...p,
              quantity: getProductsQuantity(p._id),
            }))
            .filter((p) => p.quantity)
        );
      }
    }

    if (cartProductsIds?.length > 0) {
      fetchProductsInfo();
    } else {
      setProducts([]);
    }
  }, [cartProductsIds]);

  useEffect(() => {
    console.log({ products });
  }, [products]);

  function handleFormChange(ev) {
    setForm((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.value,
    }));
  }

  function getProductsQuantity(_id) {
    return cartProductsIds.filter((pId) => pId === _id).length;
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();

    const parsedForm = parseCheckoutForm(form, cartProductsIds);

    if (!parsedForm) {
      console.error('Invalid form');
      return;
    }

    const res = await axios.post('/api/checkout', {
      form,
      cartProductsIds,
    });

    const paymentUrl = res?.data?.url;

    if (paymentUrl) {
      // window.location = paymentUrl;
      router.push(paymentUrl);
    }
  }

  if (searchParams.get('success') === '1') {
    return (
      <div className='white-box text-center max-w-lg mx-auto text-gray-800'>
        <h1 className='mb-5'>Thanks for your order!</h1>
        <p className='text-lg'>
          We will email you when your order will be sent.
        </p>
      </div>
    );
  }

  return (
    <div className='_container my-10'>
      <div className='flex flex-col md:flex-row gap-10'>
        {/* CART ITEMS */}
        <div className='min-w-[60%] white-box'>
          <h2 className='mb-4'>Cart</h2>
          <div>
            {products?.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              <CartProductsTable
                products={products}
                cartContext={cartContext}
                total={total}
              />
            )}
          </div>
        </div>

        {/* CHECKOUT */}
        {products?.length > 0 && (
          <div className='flex flex-col gap-4 white-box h-fit'>
            <form onSubmit={handleFormSubmit}>
              <div className='flex flex-col gap-1'>
                <h2 className='mb-4'>Order information</h2>
                <label>
                  <span>Name</span>
                  <input
                    required
                    onChange={handleFormChange}
                    type='text'
                    name='name'
                    placeholder='Name'
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    required
                    onChange={handleFormChange}
                    type='email'
                    name='email'
                    placeholder='Email'
                  />
                </label>
                <div className='flex gap-1 w-full'>
                  <label>
                    <span>City</span>
                    <input
                      required
                      onChange={handleFormChange}
                      type='text'
                      name='city'
                      placeholder='City'
                    />
                  </label>
                  <label>
                    <span>Postal code</span>
                    <input
                      required
                      onChange={handleFormChange}
                      type='text'
                      name='postalCode'
                      placeholder='Postal code'
                    />
                  </label>
                </div>
                <label>
                  <span>Street address</span>
                  <input
                    required
                    onChange={handleFormChange}
                    type='text'
                    name='streetAddress'
                    placeholder='Street address'
                  />
                </label>
                <label>
                  <span>Country</span>
                  <input
                    required
                    onChange={handleFormChange}
                    type='text'
                    name='country'
                    placeholder='Country'
                  />
                </label>
              </div>
              <button type='submit' className='btn-primary w-full mt-6'>
                Continue to payment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
