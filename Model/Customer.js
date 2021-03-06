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
      required: true
    },
    phone: {
      type: String,
      trim: true,
      minlength: 11,
      maxlength: 14,
      required: true
    },
    profilePic: {
      type: String,
      required: true
    },
    nidPic: {
      type: String,
      required: true
    },
   
    password: {
      type: String,
      trim: true,
      required: true
    },
    vihicalType: {
      type: String,
      enum: ["car", "bike"],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
