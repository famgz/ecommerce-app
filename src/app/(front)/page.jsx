import FeaturedProduct from '@/app/(front)/_components/FeaturedProduct';
import NewProducts from '@/app/(front)/_components/NewProducts';
import { getProducts } from '@/app/_libs/productsUtils';

export default async function HomePage() {
  const allProducts = await getProducts(8);
  const featuredProduct = allProducts.find(
    (p) => p._id === '65d2425410dec5df9236f3c6'
  );
  const newProducts = allProducts.slice(0, 8);

  return (
    <div className=''>
      <FeaturedProduct product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
