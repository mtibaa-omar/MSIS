import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    image: { type: String, default: "" },
    category: [{ type: mongoose.Schema.ObjectId, ref: "Category" }],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

subCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});
const SubCategory = mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;
