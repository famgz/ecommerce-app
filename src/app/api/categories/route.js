import { mongooseConnect } from '@/app/_libs/mongoose';
import { getId } from '@/app/_libs/utils';
import { Category } from '@/app/_models/Category';
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  await mongooseConnect();
  await isAdmin();
  return Response.json(
    await Category.find()
      .populate('parent')
      .collation({ locale: 'en' })
      .sort({ parent: 1, name: 1 })
  );
}

export async function POST(req) {
  await mongooseConnect();
  await isAdmin();
  const { name, parentCategoryId, properties } = await req.json();
  if (!name) {
    return Response.json('Invalid or empty category name');
  }
  const res = await Category.create({
    name,
    parent: parentCategoryId || null,
    properties,
  });
  return Response.json(res);
}

export async function PUT(req) {
  await mongooseConnect();
  await isAdmin();
  const { _id, name, parentCategoryId, properties } = await req.json();
  if (!_id) {
    return Response.json('No category id to update');
  }
  const res = await Category.findByIdAndUpdate(_id, {
    name,
    parent: parentCategoryId || null,
    properties,
  });
  return Response.json(res);
}

export async function DELETE(req) {
  await mongooseConnect();
  await isAdmin();
  const _id = getId(req);
  if (!_id) {
    return Response.json('No category id to update');
  }
  const res = await Category.findByIdAndDelete(_id);
  return Response.json(res);
}
