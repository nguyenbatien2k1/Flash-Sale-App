import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InfomationShop = new Schema({
  shop_id: Number,
  name: String,
  emial: String,
  domain: String,
  province: String,
  country: String,
  address1: String,
  zip: String,
  city: String
}, {
    timestamps: true
});

export default mongoose.model('InfomationShop', InfomationShop);