const { Schema, model } = require("mongoose");

const riderSchema = new Schema(
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
    area: {
      type: String,
    },
    nidPic: String,
    profilePic: String,
    drivingLCPic: String,
    carInfo: {
      name: String,
      model: String,
      namePlate: String,
    },
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

const Rider = model("Rider", riderSchema);

module.exports = Rider;
