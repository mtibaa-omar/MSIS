import mongoose from "mongoose";

const adressSchema = new mongoose.Schema(
  {
    adressLine: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String },
    country: { type: String },
    mobile: { type: Number, default: null },
  },
  { timestamps: true }
);

const Address = mongoose.model("Adress", adressSchema);

export default Address;
