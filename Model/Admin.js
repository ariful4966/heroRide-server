const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
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
  
    password: {
      type: String,
      trim: true,
      required: true
    },
    adminType: {
      type: String,
      enum: ["admin", "developer"],
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admin", adminSchema);

module.exports = Admin;
