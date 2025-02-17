import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    images: { type: Array, default: [] },
    categoryId: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
    subCategoryId: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
    stock: { type: Number, default: null },
    price: { type: Number, default: null },
    available: {
      type: String,
      enum: ["en-stock", "hors-stock", "sur-commande"],
      select: false,
    },
    discount: { type: Number, default: null },
    description: { type: String, default: "" },
    Brand: { type: String, default: "" },
    moreDetails: { type: Array, default: [] },
    publish: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
