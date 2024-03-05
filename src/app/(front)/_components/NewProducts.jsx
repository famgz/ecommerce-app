import ProductsGrid from '@/app/(front)/_components/ProductsGrid';

export default function NewProducts({ products }) {
  return (
    <div className='mt-8'>
      <div className='_container'>
        <h2 className='text-4xl font-bold'>New Arrivals</h2>
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}
