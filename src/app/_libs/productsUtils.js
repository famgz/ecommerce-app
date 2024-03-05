import { mongooseConnect } from '@/app/_libs/mongoose';
import { convertToPlainObject } from '@/app/_libs/utils';
import { Product } from '@/app/_models/Product';

export async function getProducts(limit = null, sortType = 'createdAt') {
  await mongooseConnect();
  const sortOptions = { sort: { [sortType]: -1 }, limit };
  const products = await Product.find({}, null, sortOptions);
  return convertToPlainObject(products);
}

export async function getProduct(_id) {
  await mongooseConnect();
  return await Product.findById(_id);
}
