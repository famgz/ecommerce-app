const { Schema, models, model, default: mongoose } = require('mongoose');

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: {type: [String], default: []},
  category: {type: mongoose.Types.ObjectId, ref: 'Category', default: null},
}, {timestamps: true});

export const Product = models?.Product || model('Product', ProductSchema);
