import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Product = new Schema({
  id: Number,
  title: String,
  body_html: String,
  vendor: String,
  product_type: String,
  created_at: Date,
  handle: String,
  updated_at: Date,
  published_at: String,
  template_suffix: String,
  status: String,
  published_scope: String,
  tags: String,
  admin_graphql_api_id: String,
  variants: Array,
  options: Array,
  images: Array,
  image: String
}, {
    timestamps: true
});

export default mongoose.model('Product', Product);