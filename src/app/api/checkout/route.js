import { mongooseConnect } from '@/app/(admin)/_libs/mongoose';
import { Order } from '@/app/(admin)/_models/Order';
import { Product } from '@/app/(admin)/_models/Product';
import { convertToPlainObject, parseCheckoutForm } from '@/app/_libs/utils';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function parseCartProducts(cartProductsIds) {
  try {
    const isInvalidArray =
      !cartProductsIds ||
      !Array.isArray(cartProductsIds) ||
      cartProductsIds.length === 0;

    if (isInvalidArray) {
      throw new Error('Invalid cart products array');
    }

    await mongooseConnect();

    const uniqueIds = [...new Set(cartProductsIds)];
    const productsInfo = convertToPlainObject(
      await Product.find({ _id: uniqueIds })
    );

    const foundInvalidProductId = productsInfo.length !== uniqueIds.length;

    if (foundInvalidProductId) {
      throw new Error('Some product IDs are invalid');
    }

    const line_items = uniqueIds.map((productId) => {
      const productInfo = productsInfo.find((p) => p._id === productId);
      const quantity = cartProductsIds.filter(
        (pId) => pId === productId
      ).length;

      if (!productInfo) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      return {
        quantity,
        price_data: {
          currency: 'BRL',
          product_data: {
            name: productInfo.title,
          },
          unit_amount: quantity * productInfo.price * 100, // in cents
        },
      };
    });

    return line_items;
  } catch (error) {
    console.error('Error in Cart Products:', error.message);
    throw error;
  }
}

export async function POST(req) {
  try {
    const { form, cartProductsIds } = await req.json();

    const user_data = parseCheckoutForm(form);
    if (!user_data) {
      throw new Error('Invalid form');
    }

    const line_items = await parseCartProducts(cartProductsIds);

    const data = { line_items, user_data, paid: false };

    const orderDoc = await Order.create(data);

    console.log({ data });

    const { email } = user_data;

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer_email: email,
      success_url: process.env.NEXTAUTH_URL + '/cart?success=1',
      cancel_url: process.env.NEXTAUTH_URL + '/cart?canceled=1',
      metadata: { orderId: orderDoc._id.toString() },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Error in POST:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
