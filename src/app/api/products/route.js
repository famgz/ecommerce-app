import { mongooseConnect } from '@/libs/mongoose';
import { getId } from '@/libs/utils';
import { Product } from '@/models/Product';

export async function GET(req) {
  await mongooseConnect();
  const id = getId(req);
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
  const { _id, ...rest } = data;
  const productDoc = await Product.updateOne({ _id }, rest);
  return Response.json(productDoc);
}

export async function DELETE(req) {
  await mongooseConnect();
  const id = getId(req);
  const data = await Product.findByIdAndDelete(id);
  return Response.json(data);
}
