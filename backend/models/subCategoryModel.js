import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    category: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

const SubCategory = mongoose.Model("SubCategory", subCategorySchema);

export default SubCategory;
