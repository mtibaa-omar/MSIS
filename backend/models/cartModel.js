import mongoose, { mongo } from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.ObjectId, ref: "Product" },
    name: { type: String },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number },
    unitPrice: { type: Number },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const CartProductModel = mongoose.model("CartProduct", cartProductSchema);

export default CartProductModel;
