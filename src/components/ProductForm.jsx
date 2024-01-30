'use client';

import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductForm({ product }) {
  const [title, setTitle] = useState(product?.title || '');
  const [description, setDescription] = useState(product?.description || '');
  const [price, setPrice] = useState(product?.price || '');
  const [images, setImages] = useState(product?.images || []);
  const router = useRouter();

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, description, price, images };

    // update product
    if (product?._id) {
      await axios.put('/api/products', { ...data, _id: product._id });
    }
    // create product
    else {
      await axios.post('/api/products', data);
    }
    router.push('/products');
  }

  async function uploadImages(ev) {
    ev.preventDefault();

    const files = ev.target?.files;
    if (!files?.length > 0) {
      return;
    }

    const data = new FormData();
    for (const file of files) {
      data.append('file', file);
    }

    const res = await axios.post('/api/upload', data);

    const newLinks = res?.data || [];

    setImages((prev) => [...prev, ...newLinks]);
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

        <div className='label'>
          <span>Images</span>
          <div className='flex gap-2 mb-2 flex-wrap'>
            {images?.length > 0 &&
              images.map((link, index) => (
                <img
                  key={index}
                  src={link}
                  alt='product image'
                  className='h-24 w-auto border rounded-lg'
                />
              ))}
            <label
              type='button'
              className='flex flex-col items-center justify-center gap-2 size-24 cursor-pointer border text-xs text-gray-500 rounded-lg bg-gray-100'
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} className='size-6' />
              <span>Upload</span>
              <input
                type='file'
                className='hidden'
                name=''
                id=''
                onChange={uploadImages}
                accept='image/*'
                multiple
              />
            </label>
            {images?.length > 0 ? '' : 'no images of this product yet'}
          </div>
        </div>

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
