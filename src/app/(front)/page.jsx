import { mongooseConnect } from '@/app/_libs/mongoose';
import { Product } from '@/app/_models/Product';
import FeaturedProduct from '@/app/(front)/_components/FeaturedProduct';
import NewProducts from '@/app/(front)/_components/NewProducts';
import { convertToPlainObject } from '@/app/_libs/utils';

export async function getAllProducts() {
  await mongooseConnect();
  return await Product.find({}, null, { sort: { updatedAt: -1 } });
}

export default async function HomePage() {
  const rawProducts = await getAllProducts();
  const allProducts = convertToPlainObject(rawProducts);
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
