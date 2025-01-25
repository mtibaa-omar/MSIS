import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type },
    image: { type: Array, default: [] },
    categoryId: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
    subCategoryId: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
    unit: { type: String, default: "" },
    stock: { type: Number, default: null },
    price: { type: Number, default: null },
    discount: { type: Number, default: null },
    description: { type: String, default: "" },
    moreDetails: { type: Object, default: {} },
    publish: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
