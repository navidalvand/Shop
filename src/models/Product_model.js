const mongoose = require("mongoose");

const productScheama = new mongoose.Schema({
  owner: { type: mongoose.SchemaTypes.ObjectId, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.SchemaTypes.ObjectId, required: true },
  images: {
    type: [String],
    required: true,
    default: "http://localhost:3000/default-product.png",
  },
  type: { type: String, enum: ["sell", "buy", "exchange"] },
  city: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: String, required: true },
  contact: { type: String, required: true },
  status: {
    type: String,
    enum: ["accepted", "rejected", "waiting"],
    required: true,
    default: "waiting",
  },
});

const ProductModel = mongoose.model("products", productScheama);

module.exports = { ProductModel };
