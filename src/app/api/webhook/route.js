import { mongooseConnect } from '@/app/_libs/mongoose';
import { Order } from '@/app/_models/Order';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await mongooseConnect();

  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      sig,
      process.env.STRIPE_SIGN_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return Response.json(err, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const eventData = event.data.object;
      const paid = eventData.payment_status === 'paid';
      const orderId = eventData?.metadata?.orderId;
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
        console.log('Order succesfully paid!');
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json('ok', { status: 200 });
}
