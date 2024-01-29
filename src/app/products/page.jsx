'use client';

import DeleteButton from '@/components/DeleteButton';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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
                  <Link
                    href={'/products/edit/' + p._id}
                    className='btn-primary mr-2'
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className='size-3' />
                    <span>Edit</span>
                  </Link>

                  <DeleteButton
                    label={'Delete'}
                    onDelete={() => deleteProduct(p._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
