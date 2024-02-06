'use client';

import DeleteButton from '@/components/DeleteButton';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductsPage(params) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, [products]);

  function deleteProduct(_id) {
    axios
      .delete('/api/products?id=' + _id)
      .then((res) => console.log('deleted:', res.data));
    setProducts((prev) => prev.filter((p) => p._id !== _id));
  }

  return (
    <div className='grid gap-4'>
      <Link
        className='flex gap-2 items-center bg-dark py-2 px-4 rounded-full w-fit'
        href={'/products/new'}
      >
        <FontAwesomeIcon icon={faPlus}/>
        Add product
      </Link>
      <div className='flex flex-col gap-2'>
        <h1 className='font-bold text-md mt-2'>Products</h1>
        {products.map((p) => (
          <div key={p._id} className='flex'>
            <span className='flex-1 border-b border-solid border-gray-200 mr-5'>
              {p.title}
            </span>
            <Link href={'/products/edit/' + p._id} className='btn-primary mr-2'>
              <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
              <span>Edit</span>
            </Link>

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
