// backend/models/Vinyl.js
const mongoose = require("mongoose"); // ← heel belangrijk

const VinylSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number },
  image: { type: String },
  url: {type: String},
  releaseId: {type: String},
  resource_url: {type: String}
});

module.exports = mongoose.model("Vinyl", VinylSchema); // ← correct exporteren
