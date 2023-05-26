import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InfoWebhook = new Schema({
  webhook_id: Number,
  title: String,
  body_html: String,
  vendor: String,
  variants: Array
}, {
    timestamps: true
});

export default mongoose.model('InfoWebhook', InfoWebhook);