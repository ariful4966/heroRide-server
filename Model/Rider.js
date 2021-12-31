const { Schema, model } = require("mongoose");

const riderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    area: {
      type: String,
      required: true,
    },
    nidPic: {
      type: String,
      required: true
    },
    profilePic: {
      type: String,
      required: true
    },
    drivingLCPic: {
      type: String,
      required: true
    },
    carInfo: {
      name: {
        type: String,
        required: true
      },
      model: {
        type:String,
        required: true
      },
      namePlatePic: {
        type: String,
        required: true
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    vihicalType: {
      type: String,
      enum: ["car", "bike"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rider = model("Rider", riderSchema);

module.exports = Rider;
