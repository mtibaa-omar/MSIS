import Product from "../models/productModel.js";
import SubCategory from "../models/subCategoryModel.js";
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

export const getProductsBySubCategorySlug = catchAsync(
  async (req, res, next) => {
    const { slug } = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log("Slug:", slug, "Page:", page, "Limit:", limit);

    const subCategory = await SubCategory.findOne({ slug });
    if (!subCategory) {
      return next(new AppError("Subcategory not found", 404));
    }

    const products = await Product.find({ subCategoryId: subCategory._id })
      .populate("categoryId")
      .populate("subCategoryId")
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({
      subCategoryId: subCategory._id,
    });
    res.status(200).json({
      status: "success",
      results: products.length,
      page,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  }
);

export const getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findOne({ _id: id })
    .populate("categoryId")
    .populate("subCategoryId");
  if (!product) {
    return next(new AppError("product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});
