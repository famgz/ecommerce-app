'use client';

import ProductForm from '@/app/(admin)/dashboard/_components/ProductForm';

export default function NewProductPage() {
  return (
    <div className='_container'>
      <h1>New Product</h1>
      <ProductForm label='New Product' />
    </div>
  );
}
