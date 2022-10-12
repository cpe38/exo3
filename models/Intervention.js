const mongoose = require("mongoose");

const interventionSchema = mongoose.Schema({
  agentId: { type: String, required: true },
  motif: { type: String, required: true },
  lieu: { type: String, required: true },
  date: { type: String, required: false },
});

module.exports = mongoose.model("Intervention", interventionSchema);
