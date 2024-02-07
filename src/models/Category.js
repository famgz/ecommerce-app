const { Schema, models, model, default: mongoose } = require('mongoose');

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxLength: 30,
    },
    parent: { type: mongoose.Types.ObjectId, ref: 'Category', default: null },
  },
  { timestamps: true }
);

export const Category = models?.Category || model('Category', CategorySchema);
