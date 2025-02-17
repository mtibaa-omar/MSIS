import SubCategory from "../models/subCategoryModel.js";
import catchAsync from "../utils/catchAsync.js";

export const addSubCategory = catchAsync(async (req, res, next) => {
  const { name, image, category } = req.body;
  console.log({ name, image, category });

  const saveCategory = await SubCategory.create({ name, image, category });
  console.log(saveCategory);
  if (!saveCategory) {
    return res.status(500).json({
      message: "Not Created",
    });
  }

  return res.status(201).json({
    message: "Sub Category Created Successfully",
    data: saveCategory,
  });
});

export const getSubCategories = catchAsync(async (req, res, next) => {
  const data = await SubCategory.find()
    .sort({ createdAt: -1 })
    .populate("category");
  return res.status(200).json(data);
});

export const deleteSubCategory = catchAsync(async (req, res, next) => {
  const { id: SubCategoryId } = req.params;

  const deleteSubCategory = await SubCategory.deleteOne({ _id: SubCategoryId });
  res.status(200).json({
    message: "deleted",
  });
});
