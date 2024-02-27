import { mongooseConnect } from '@/app/(admin)/_libs/mongoose';
import { getId } from '@/app/(admin)/_libs/utils';
import { Order } from '@/app/(admin)/_models/Order';
import { isAdmin } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  await mongooseConnect();
  await isAdmin();
  const orders = await Order.find().sort({ createdAt: -1 });
  return Response.json(orders);
}

export async function DELETE(req) {
  await mongooseConnect();
  await isAdmin();
  const _id = getId(req);
  if (!_id) {
    return Response.json('No order id to update');
  }
  const res = await Order.findByIdAndDelete(_id);
  return Response.json(res);
}
