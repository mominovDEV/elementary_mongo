const { Schema, model } = require("mongoose");
const Department = require("./department");
const workerSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },

    age: { type: Number, min: 18 },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    subdepartment: Department.schema,
    departments: [Department.schema],
  },
  {
    versionKey: false,
  }
);

module.exports = model("worker", workerSchema);
