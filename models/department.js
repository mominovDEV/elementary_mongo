const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    info: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Department", departmentSchema);
