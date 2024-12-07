const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Path to the uploaded image
});

module.exports = mongoose.model("Land", landSchema);
