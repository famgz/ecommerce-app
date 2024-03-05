import ProductsGrid from '@/app/(front)/_components/ProductsGrid';
import { getProducts } from '@/app/_libs/productsUtils';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className='_container my-10'>
      <div></div>
      <h1>All Products</h1>
      <ProductsGrid products={products} />
    </div>
  );
}
