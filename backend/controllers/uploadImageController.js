import multer from "multer";
import catchAsync from "../utils/catchAsync.js";
import uploadImagesToCloudinary from "../utils/uploadCloudinary.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadCategoryImages = upload.any();

export const uploadImage = catchAsync(async (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const uploadedImages = await uploadImagesToCloudinary(files);
  return res.status(200).json({
    message: "Upload done",
    data: uploadedImages,
  });
});
