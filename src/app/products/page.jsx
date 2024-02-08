'use client';

import DeleteButton from '@/components/DeleteButton';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }

  function deleteProduct(_id) {
    axios
      .delete('/api/products?_id=' + _id)
      .then((res) => console.log('deleted:', res.data))
      .finally(() => getProducts());
  }

  return (
    <div className='container grid gap-4'>
      <h1>Products</h1>

      {/* Add product button */}
      <Link
        className='btn-primary w-fit'
        href={'/products/new'}
      >
        <FontAwesomeIcon icon={faPlus} className='size-3'/>
        Add product
      </Link>

      {/* Products list */}
      <div className='flex flex-col gap-2 mt-5'>
        {products.map((p) => (
          <div key={p._id} className='flex'>
            {/* product name */}
            <span className='flex-1 line-below mr-5 font-semibold'>{p.title}</span>

            {/* edit button */}
            <Link href={'/products/edit/' + p._id} className='btn-primary mr-2'>
              <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
              <span>Edit</span>
            </Link>

            {/* delete button */}
            <DeleteButton
              label={'Delete'}
              onDelete={() => deleteProduct(p._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
