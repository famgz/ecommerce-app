const { Schema, models, model, default: mongoose } = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  price_data: {
    currency: {
      type: String,
      required: true,
    },
    product_data: {
      name: {
        type: String,
        required: true,
      },
    },
    unit_amount: {
      type: Number,
      required: true,
    },
  },
});

const userDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    line_items: [
      {
        type: lineItemSchema,
        required: true,
      },
    ],
    user_data: {
      type: userDataSchema,
      required: true,
    },
    paid: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, minimize: false }
);

export const Order = models?.Order || model('Order', OrderSchema);
