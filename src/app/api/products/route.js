import { mongooseConnect } from '@/app/(admin)/_libs/mongoose';
import { getId } from '@/app/(admin)/_libs/utils';
import { Product } from '@/app/(admin)/_models/Product';
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  await mongooseConnect();
  await isAdmin();
  let _id = getId(req);
  // check if params is an array of ids
  try {
    _id = JSON.parse(_id);
  } catch (err) {}
  const data = _id ? await Product.find({ _id }) : await Product.find();
  return Response.json(data);
}

export async function POST(req) {
  await mongooseConnect();
  await isAdmin();
  const data = await req.json();
  const productDoc = await Product.create(data);
  return Response.json(productDoc);
}

export async function PUT(req) {
  await mongooseConnect();
  await isAdmin();
  const data = await req.json();
  const { _id, ...rest } = data;
  if (!_id) {
    return Response.json('No product id to update');
  }
  console.log(rest);
  const productDoc = await Product.findByIdAndUpdate(_id, rest);
  return Response.json(productDoc);
}

export async function DELETE(req) {
  await mongooseConnect();
  await isAdmin();
  const _id = getId(req);
  if (!_id) {
    return Response.json('No product id to delete');
  }
  const data = await Product.findByIdAndDelete(_id);
  return Response.json(data);
}
