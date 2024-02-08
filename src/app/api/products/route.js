import { mongooseConnect } from '@/libs/mongoose';
import { getId } from '@/libs/utils';
import { Product } from '@/models/Product';

export async function GET(req) {
  await mongooseConnect();
  const _id = getId(req);
  const data = _id ? await Product.findById(_id) : await Product.find();
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
  if (!_id) {
    return Response.json('No product id to update');
  }
  const productDoc = await Product.findByIdAndUpdate(_id, rest);
  return Response.json(productDoc);
}

export async function DELETE(req) {
  await mongooseConnect();
  const _id = getId(req);
  if (!_id) {
    return Response.json('No product id to delete');
  }
  const data = await Product.findByIdAndDelete(_id);
  return Response.json(data);
}
