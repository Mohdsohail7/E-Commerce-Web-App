const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, default: 1 },
    priceAtAdd: { type: Number }
});

const cartSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
items: [cartItemSchema],
updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);