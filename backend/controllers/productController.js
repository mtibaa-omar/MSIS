import Product from "../models/productModel.js";
import catchAsync from "../utils/catchAsync.js";

export const addProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    images,
    categoryId,
    subCategoryId,
    available,
    brand,
    stock,
    price,
    discount,
    description,
    moreDetails,
  } = req.body;

  const saveProduct = await Product.create({
    name,
    images,
    categoryId,
    subCategoryId,
    stock,
    available,
    brand,
    price,
    discount,
    description,
    moreDetails,
  });
  console.log(saveProduct);
  if (!saveProduct) {
    return res.status(500).json({
      message: "Not Created",
    });
  }

  return res.status(201).json({
    message: "Sub Category Created Successfully",
    data: saveProduct,
  });
});

export const getProducts = catchAsync(async (req, res, next) => {
  let { page, limit, search } = req.query;

  page = Number(page) || 1;
  limit = Number(limit) || 10;

  console.log({ page, limit, search });

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("categoryId")
      .populate("subCategoryId"),
    Product.countDocuments(query),
  ]);

  return res.json({
    message: "Product data",
    totalCount,
    totalNoPage: Math.ceil(totalCount / limit),
    data,
  });
});
