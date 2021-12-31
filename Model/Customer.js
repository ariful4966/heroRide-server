const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      trim: true,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    profilePic: String,
    nidPic: String,
   
    password: {
      type: String,
      trim: true,
    },
    vihicalType: {
      type: String,
      enum: ["car", "bike"],
    },
  },
  {
    timestamps: true,
  }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
