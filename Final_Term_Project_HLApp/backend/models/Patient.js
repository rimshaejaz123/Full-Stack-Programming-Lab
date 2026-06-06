// Placeholder
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    medicalHistory: {
      type: String,
      default: "None",
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);