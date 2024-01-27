'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductForm({ product }) {
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price };
    
    // update product
    if(product?._id) {
      await axios.put('/api/products', {...data, _id: product._id});
    }
    // create product
    else {
      await axios.post('/api/products', data);
    }
    router.push('/products');
  }

  return (
    <div>
      <form onSubmit={saveProduct} className='grid gap-1'>
        <label>
          <span>Product Name</span>
          <input
            type='text'
            placeholder='product name'
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            placeholder='description'
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            required
          />
        </label>

        <label>
          <span>Price (in USD)</span>
          <input
            type='number'
            placeholder='price'
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            required
          />
        </label>

        <button type='submit' className='btn-primary mt-3 w-fit'>
          Save
        </button>
      </form>
    </div>
  );
}
