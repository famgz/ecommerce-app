import { mongooseConnect } from '@/app/_libs/mongoose';
import { Product } from '@/app/_models/Product';

export async function POST(req) {
  await mongooseConnect();
  const ids = await req.json();
  return Response.json(await Product.find({ _id: ids }));
}
