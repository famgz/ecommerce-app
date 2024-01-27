'use client';

import ProductForm from '@/components/ProductForm';

export default function NewProductPage(params) {
  return (
    <div>
      <h1>New Product</h1>
      <ProductForm label='New Product' />
    </div>
  );
}
