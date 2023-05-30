import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
  admin_graphql_api_id: String,
  body_html: String,
  created_at: Date,
  handle: String,
  id: Number,
  image: { type: Array, default: null},
  images: Array,
  options: Array,
  product_type: String,
  published_at: Date,
  published_scope: String,
  status: String,
  tags: String,
  template_suffix: String,
  title: String,
  updated_at: Date,
  variants: Array,
  vendor: String
}, {
    timestamps: true
});

export default mongoose.model('Product', Product);