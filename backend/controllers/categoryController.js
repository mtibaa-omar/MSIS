import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import SubCategory from "../models/subCategoryModel.js";
import catchAsync from "../utils/catchAsync.js";

export const addCategory = catchAsync(async (req, res, next) => {
  const { name, image } = req.body;
  console.log({ name, image });

  const saveCategory = await Category.create({ name, image });
  console.log(saveCategory);
  if (!saveCategory) {
    return res.status(500).json({
      message: "Not Created",
    });
  }

  return res.status(201).json({
    message: "Add Category",
    data: saveCategory,
  });
});

export const getCategory = catchAsync(async (req, res, next) => {
  const data = await Category.find().sort({ createdAt: -1 });
  return res.status(200).json(data);
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { categoryId, name, image } = req.body;
  const updatedCategory = await Category.updateOne(
    {
      _id: categoryId,
    },
    {
      name,
      image,
    }
  );
  return res.status(204).json({
    message: "Updated Category",
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;
  const checkSubCategory = await SubCategory.find({
    category: {
      $in: [categoryId],
    },
  }).countDocuments();

  const checkProduct = await Product.find({
    category: {
      $in: [categoryId],
    },
  }).countDocuments();

  if (checkSubCategory > 0 || checkProduct > 0) {
    return res.status(400).json({
      message: "Category is already use can't delete",
    });
  }

  const deletedCategory = await Category.deleteOne({ _id: categoryId });
  res.status(200).json({
    message: "deleted",
  });
});
