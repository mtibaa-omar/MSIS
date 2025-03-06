import { useState } from "react";
// import { useAddSubCategory } from "./useAddSubCategory";
import { Divider } from "@mui/material";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import { useFieldArray, useForm } from "react-hook-form";
import { useUploadImage } from "./useUploadImage";
import { useCategories } from "./useCategories";
import { useSubCategories } from "./useSubCategories";
import Textarea from "../../ui/Textarea";
import Select from "../../ui/Select";
import { FiMinusCircle } from "react-icons/fi";
import AddField from "./AddField";
import { useAddProduct } from "./useAddProduct";

function CreateProductForm() {
  const isEditSession = false;
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  const { isUploading, uploadImage } = useUploadImage();
  const { isLoading, categories } = useCategories();
  const { isLoadingSub, subCategories } = useSubCategories();
  const { isAddingProduct, addProduct } = useAddProduct();
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });
  const {
    fields: moreDetailsFields,
    append: appendMoreDetails,
    remove: removeMoreDetails,
  } = useFieldArray({
    control,
    name: "moreDetails",
  });
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      appendImage({ file });
    });
  };
  const handleRemoveImage = (index) => {
    removeImage(index);
  };
  function onSubmit(data) {
    const category = JSON.parse(data.category);
    const subCategory = JSON.parse(data.subCategory);
    const formData = new FormData();
    data.images.forEach((image) => {
      formData.append("image", image.file);
    });
    uploadImage(formData, {
      onSuccess: ({ data: imageData }) => {
        addProduct(
          {
            ...data,
            images: imageData.data,
            categoryId: category,
            subCategoryId: subCategory,
          },
          {
            onSuccess: () => {
              // reset();
              // removeMoreDetails();
              removeImage();
            },
            onError: (error) => {
              console.error("Failed to add Product:", error);
            },
          }
        );
      },
      onError: (err) => {
        console.error("Upload failed:", err);
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-4xl font-bold font-robotoMono">
        {isEditSession ? "Edit Product" : "Add Product"}
      </div>
      <FormRow label="Product Name" error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isUploading || isAddingProduct}
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Brand Name" error={errors?.brandName?.message}>
        <Input
          type="text"
          disabled={isUploading || isAddingProduct}
          id="brandName"
          {...register("brandName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for Product"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label={`Category `}>
        <Select
          id={`category`}
          disabled={isUploading || isLoading || isAddingProduct}
          options={[
            { value: "0", label: "Select a Category" },
            ...(categories
              ? categories.map((category) => {
                  return {
                    value: JSON.stringify(category),
                    label: category.name,
                  };
                })
              : []),
          ]}
          {...register(`category`, {
            validate: (value) => value !== "0" || `Please select category`,
          })}
        />
      </FormRow>
      <FormRow label={`Sub Category`}>
        <Select
          id={`subCategory`}
          disabled={isUploading || isLoadingSub || isAddingProduct}
          options={[
            { value: "0", label: "Select a Sub Category" },
            ...(subCategories
              ? subCategories.map((subCategory) => {
                  return {
                    value: JSON.stringify(subCategory),
                    label: subCategory.name,
                  };
                })
              : []),
          ]}
          {...register(`subCategory`, {
            validate: (value) => value !== "0" || `Please select sub category`,
          })}
        />
      </FormRow>
      <FormRow label={`Availability`}>
        <Select
          id={`available`}
          disabled={isUploading || isLoadingSub || isAddingProduct}
          options={[
            { value: "0", label: "Select availability" },
            { value: "en-stock", label: "En Stock" },
            { value: "sur-commande", label: "Sur commande" },
            { value: "hors-stock", label: "Hors Stock" },
          ]}
          {...register(`available`, {
            validate: (value) =>
              value !== "0" || `Please select sub Availability`,
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          disabled={isUploading || isAddingProduct}
          placeholder="Enter Price"
          id="price"
          {...register("price", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Number of stock" error={errors?.stock?.message}>
        <Input
          type="number"
          disabled={isUploading || isAddingProduct}
          defaultValue={1}
          placeholder="Enter Product stock"
          id="stock"
          {...register("stock", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isAddingProduct}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().price ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>
      <FormRow label="Product images" error={errors?.image?.message}>
        <FileInput
          id="categoryImage"
          accept="image/*"
          disabled={isUploading || isAddingProduct}
          type="file"
          multiple
          onChange={handleImageChange}
        />
      </FormRow>
      <Divider />
      <div className="flex gap-4 p-2">
        {imageFields.map((image, index) => {
          return (
            <div key={image.id} className="relative">
              <img
                src={URL.createObjectURL(image.file)}
                alt="preview"
                width="100"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 px-2 py-1 text-xs text-white bg-red-500"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      {!moreDetailsFields.length ? (
        <div className="text-sm text-gray-500">
          No Fields added add if u want.
        </div>
      ) : (
        moreDetailsFields.map((field, index) => {
          return (
            <FormRow key={field.id} label={`${field.name}`}>
              <Input
                type="text"
                id={`${field.name}`}
                disabled={isAddingProduct}
              />
              <div className="flex items-center">
                {errors?.name?.[index] && (
                  <span className="block font-bold text-red-500 text-md">
                    {errors.name[index].message}
                  </span>
                )}
                <FiMinusCircle
                  size={30}
                  className="ml-2 text-red-500 hover:text-red-600 hover:cursor-pointer"
                  onClick={() => removeMoreDetails(index)}
                />
              </div>
            </FormRow>
          );
        })
      )}
      <FormRow>
        <Button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          disabled={isAddingProduct}
        >
          Add Field
        </Button>
      </FormRow>
      <AddField
        onSubmitFct={appendMoreDetails}
        open={open}
        closeModal={() => setOpen(false)}
      />

      <FormRow>
        <Button
          type="reset"
          variation="reset"
          disabled={isUploading || isAddingProduct}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading || isAddingProduct}>
          Submit
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
