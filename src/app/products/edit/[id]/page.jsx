'use client';

import ProductForm from '@/components/ProductForm';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get('/api/products?id=' + id)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, [id]);

  return (
    <div>
      <h1>Edit Product</h1>
      {product && <ProductForm product={product} />}
    </div>
  );
}
