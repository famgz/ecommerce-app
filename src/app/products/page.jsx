/** @format */

'use client';

import DeleteButton from '@/components/DeleteButton';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  function getProducts() {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }

  function getCategories() {
    axios.get('/api/categories').then((res) => setCategories(res.data));
  }

  function getCategoryName(categoryId) {
    return categories.find((c) => c._id === categoryId)?.name;
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
      <Link className='btn-primary w-fit' href={'/products/new'}>
        <FontAwesomeIcon icon={faPlus} className='size-3' />
        Add product
      </Link>

      {/* Products list */}
      <div className='flex flex-col gap-2 mt-5'>
        <div className='grid grid-cols-[5fr_94px] flex-1'>
          <div className='grid grid-cols-2'>
            <span className='label'>Name</span>
            <span className='label'>Category</span>
          </div>
          {/* <div className='w-[94px]'></div> */}
        </div>
        {products.map((p) => (
          <div key={p._id} className='grid grid-cols-[5fr_94px] w-full'>
            <div className='grid grid-cols-2 line-below'>
              {/* product name */}
              <span className='font-semibold'>{p.title}</span>
              <span className=''>{getCategoryName(p.category)}</span>
            </div>

            <div className='flex gap-1 justify-end'>
              {/* edit button */}
              <Link href={'/products/edit/' + p._id} className='btn-primary'>
                <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
              </Link>

              {/* delete button */}
              <DeleteButton label={''} onDelete={() => deleteProduct(p._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
