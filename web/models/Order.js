import mongoose from "mongoose";

const Schema = new mongoose.Schema;

const Order = new Schema({
    order_id: Number,
    customer_id: Number,
    products: Array,
    total_price: Number
}, {
    timestamps: true
})

export default mongoose.model('Order', Order)