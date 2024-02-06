import { mongooseConnect } from "@/libs/mongoose";

export async function POST(req) {
  await mongooseConnect();
  const data = await req.json();
  const productDoc = await Product.create(data);
  return Response.json(productDoc);
}