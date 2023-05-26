import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Campaign = new Schema({
  campaign_name: String,
  start_time: String,
  end_time: String,
  products: Array,
  discount_rate: Number,
  payment: String,
  active: Boolean
}, {
    timestamps: true
});

export default mongoose.model('Campaign', Campaign);