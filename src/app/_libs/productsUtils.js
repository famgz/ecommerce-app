import { mongooseConnect } from '@/app/_libs/mongoose';
import { convertToPlainObject } from '@/app/_libs/utils';
import { Product } from '@/app/_models/Product';

export async function getProducts(limit = null, sort = 'createdAt') {
  await mongooseConnect();
  const options = { sort: { [sort]: -1 }, limit };
  const products = await Product.find({}, null, options);
  return convertToPlainObject(products);
}
