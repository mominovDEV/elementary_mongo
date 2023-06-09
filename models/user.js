const { Schema, model } = require("mongoose");

function getSalary(sallary) {
  return (sallary / 100).toFixed(2);
}

function setSalary(sallary) {
  return sallary * 100;
}
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please, tug'ri kriting"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Parol juda qisqa"],
      maxLength: [20, "prol juda uzun"],
    },
    age: {
      type: Number,
      min: [18, "18 yoshdan katta bulishi kerak"],
      max: [30, "30 yoshdan kichik bulishi kerak"],
    },
    gender: {
      type: String,
      enum: ["erkak", "ayol"],
      alias: "jinsi",
    },
    isMarried: Boolean,
    wife: {
      type: Object,
      required: function () {
        return this.isMarried;
      },

      name: {
        type: String,
        trim: true,
      },
      age: {
        type: Number,
        min: 18,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /\d{2}-\d{3}-\d{2}-\d{2}/.test(value);
        },
        message: (props) => `${props.value}-raqam notug'ri`,
      },
      maxLength: 12,
      index: true,
    },
    salary: {
      type: Number,
      get: getSalary,
      set: setSalary,
    },
  },
  {
    versionKey: false,
    toJSON: { getters: true },
  }
);

//  Statik
userSchema.static.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

//  Query Helpers
userSchema.query.byName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

userSchema.set("validateBeforeSave", false);

userSchema.pre("validate", ()=>{
  
});


module.exports = model("User", userSchema);
