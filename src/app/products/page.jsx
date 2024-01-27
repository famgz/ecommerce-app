'use client';

import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductsPage(params) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div className='grid gap-4'>
      <Link
        className='bg-dark py-2 px-4 rounded-full w-fit'
        href={'/products/new'}
      >
        Add new product
      </Link>
      <div>
        <table className='basic'>
          <thead>
            <tr>
              <th>Product name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>
                  <Link href={'/products/edit/' + p._id}>
                    <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
                    <span>Edit</span>
                  </Link>
                  <Link href={'/products/' + p._id}>
                    <FontAwesomeIcon icon={faTrashCan} className='size-3' />
                    <span>Delete</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
