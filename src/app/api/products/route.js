import { mongooseConnect } from '@/libs/mongoose';
import { Product } from '@/models/Product';

export async function GET(req) {
  await mongooseConnect();
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const id = params.get('id');
  const data = id ? await Product.findById(id) : await Product.find();
  return Response.json(data);
}

export async function POST(req) {
  await mongooseConnect();
  const data = await req.json();
  const productDoc = await Product.create(data);
  return Response.json(productDoc);
}

export async function PUT(req) {
  await mongooseConnect();
  const data = await req.json();
  const { title, description, price, _id } = data;
  const productDoc = await Product.updateOne(
    { _id },
    { title, description, price }
  );
  return Response.json(productDoc);
}
