'use client';

import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!_id) {
      return;
    }
    axios
      .get('/api/products?_id=' + _id)
      .then((res) => setProduct(res.data))
  }, [_id]);

  return (
    <div className='container'>
      <h1>Edit Product</h1>
      {product && <ProductForm product={product} />}
    </div>
  );
}
