const mongoose = require("mongoose");

const interventionSchema = mongoose.Schema({
  agentId: { type: String, required: true },
  motif: { type: String, required: true },
  lieu: { type: String, required: false },
  date: { type: Date },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Intervention", interventionSchema);
