import { mongooseConnect } from '@/libs/mongoose';
import { getId } from '@/libs/utils';
import { Category } from '@/models/Category';

export async function GET() {
  await mongooseConnect();
  return Response.json(
    await Category.find()
      .populate('parent')
      .collation({ locale: 'en' })
      .sort({ parent: 1, name: 1 })
  );
}

export async function POST(req) {
  await mongooseConnect();
  const { name, parentCategory } = await req.json();
  if (!name) {
    return Response.json('Invalid or empty category name');
  }
  const res = await Category.create({ name, parent: parentCategory || null });
  return Response.json(res);
}

export async function PUT(req) {
  await mongooseConnect();
  const { _id, name, parentCategory } = await req.json();
  if (!_id) {
    return Response.json('No id to update');
  }
  const res = await Category.findByIdAndUpdate(_id, {
    name,
    parent: parentCategory || null,
  });
  return Response.json(res);
}

export async function DELETE(req) {
  await mongooseConnect();
  const _id = getId(req);
  if (!_id) {
    return Response.json('No id to update');
  }
  const res = await Category.findByIdAndDelete(_id);
  return Response.json(res);
}
