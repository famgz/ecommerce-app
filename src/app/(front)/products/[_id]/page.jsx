'use client';

import AddToCartButton from '@/app/(front)/_components/buttons/AddToCartButton';
import { formatToReal } from '@/app/_libs/utils';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductPage() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (_id) {
      axios.get('/api/products?_id=' + _id).then((res) => setProduct(res.data));
    }
  }, [_id]);

  return (
    <div className='_container my-10'>
      {product && (
        <>
          <div className='flex flex-col md:flex-row gap-x-10'>
            {/* CART ITEMS */}
            <div className='flex flex-col gap-6 max-w-[40%] white-box w-full'>
              <div className='relative rounded-lg overflow-hidden size-full min-h-[300px]'>
                <Image
                  alt={product.title}
                  src={product.images[activeImageIndex]}
                  fill
                  className='object-contain'
                />
              </div>
              <div className='flex justify-start h-full -mb-1 gap-2 overflow-x-auto hide-scrollbar'>
                {product.images.map((img, idx) => (
                  <Image
                    key={idx}
                    alt='product image'
                    src={img}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-[100px] w-auto rounded-md border p-2 cursor-pointer'
                    onClick={() => {
                      setActiveImageIndex(idx);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className='flex flex-col gap-4 line-top mt-5 px-2 w-full'>
              <h2>{product.title}</h2>
              <p className='mt-5'>{product.description}</p>
              <div className='flex gap-4'>
                <span className='text-2xl font-extrabold'>
                  {formatToReal(product.price)}
                </span>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
