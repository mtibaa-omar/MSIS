import { Modal } from "@mui/material";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import { useCategories } from "./useCategories";
import { useFieldArray, useForm } from "react-hook-form";
import { useAddSubCategory } from "./useAddSubCategory";
import { useUploadImage } from "./useUploadImage";
import { FiMinusCircle } from "react-icons/fi";
import { useUpdateSubCategory } from "./useUpdateSubCategory";
import { useEffect } from "react";

function CreateSubCategoryForm({ open, closeModal, subCategoryToEdit = {} }) {
  const isEditSession = Boolean(subCategoryToEdit?._id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: subCategoryToEdit?.name || "",
      category: subCategoryToEdit?.category
        ? subCategoryToEdit.category.map((cat) => JSON.stringify(cat))
        : [],
    },
  });

  useEffect(() => {
    if (subCategoryToEdit?._id) {
      reset({
        name: subCategoryToEdit.name,
        category: subCategoryToEdit.category
          ? subCategoryToEdit.category.map((cat) => JSON.stringify(cat))
          : [],
      });
    }
  }, [subCategoryToEdit?._id, reset]);

  const { isLoading, categories } = useCategories();
  const { isUploading, uploadImage } = useUploadImage();
  const { isAddingSubCategory, addSubCategory } = useAddSubCategory();
  const { isUpdatingSubCategory, updateSubCategory } = useUpdateSubCategory();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });

  function onSubmit(dataForm) {
    const selectedCategories =
      dataForm.category && dataForm.category.length > 0
        ? dataForm.category.map((cat) => JSON.parse(cat))
        : [];

    // Common payload fields for create and update
    const payload = {
      name: dataForm.name,
      category: selectedCategories,
    };

    // Get the image file (if provided)
    const imageFile = dataForm.image && dataForm.image[0];

    if (!isEditSession) {
      // CREATE FLOW
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        uploadImage(formData, {
          onSuccess: ({ data: imageData }) => {
            addSubCategory(
              {
                ...payload,
                image: imageData.data[0],
              },
              {
                onSuccess: () => {
                  closeModal?.();
                  reset();
                },
                onError: (error) => {
                  console.error("Failed to add sub category:", error);
                },
              }
            );
          },
          onError: (err) => {
            console.error("Upload failed:", err);
          },
        });
      }
    } else {
      // UPDATE FLOW
      if (imageFile) {
        // If a new image is provided, upload it first
        const formData = new FormData();
        formData.append("image", imageFile);
        uploadImage(formData, {
          onSuccess: ({ data: imageData }) => {
            updateSubCategory(
              {
                id: subCategoryToEdit._id,
                categoryData: {
                  ...payload,
                  image: imageData.data[0],
                },
              },
              {
                onSuccess: () => {
                  reset();
                  closeModal?.();
                },
                onError: (error) => {
                  console.error("Failed to update sub category:", error);
                },
              }
            );
          },
          onError: (err) => {
            console.error("Upload failed:", err);
          },
        });
      } else {
        // No new image provided: use the existing image
        updateSubCategory(
          {
            id: subCategoryToEdit._id,
            categoryData: {
              ...payload,
              image: subCategoryToEdit.image,
            },
          },
          {
            onSuccess: () => {
              reset();
              closeModal?.();
            },
            onError: (error) => {
              console.error("Failed to update sub category:", error);
            },
          }
        );
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Form onSubmit={handleSubmit(onSubmit)} type="modal">
        <div className="text-4xl font-bold font-robotoMono">
          {isEditSession ? "Edit Sub Category" : "Add Sub Category"}
        </div>
        <FormRow label="Sub Category Name" error={errors?.name?.message}>
          <Input
            type="text"
            disabled={
              isUploading || isAddingSubCategory || isUpdatingSubCategory
            }
            id="name"
            {...register("name", {
              required: "This field is required",
            })}
          />
        </FormRow>

        <FormRow label="Category image" error={errors?.image?.message}>
          <FileInput
            id="categoryImage"
            accept="image/*"
            disabled={
              isUploading || isAddingSubCategory || isUpdatingSubCategory
            }
            type="file"
            {...register("image", {
              required: !isEditSession ? "This field is required" : false,
            })}
          />
          {isEditSession && subCategoryToEdit.image && (
            <img
              src={subCategoryToEdit.image}
              alt={subCategoryToEdit.name}
              className="w-32 h-32 mt-2"
            />
          )}
        </FormRow>

        {!fields.length ? (
          <div className="text-sm text-gray-500">
            No category available. Add a category to proceed.
          </div>
        ) : (
          fields.map((field, index) => (
            <FormRow key={field.id} label={`Category ${index + 1}`}>
              <Select
                id={`category.${index}`}
                disabled={
                  isUploading || isAddingSubCategory || isUpdatingSubCategory
                }
                options={[
                  { value: "0", label: "Select a Category" },
                  ...(categories
                    ? categories.map((cat) => ({
                        value: JSON.stringify(cat),
                        label: cat.name,
                      }))
                    : []),
                ]}
                {...register(`category.${index}`, {
                  validate: (value) =>
                    value !== "0" || `Please select category ${index + 1}`,
                })}
              />
              <div className="flex items-center">
                {errors?.categories?.[index] && (
                  <span className="block font-bold text-red-500 text-md">
                    {errors.categories[index].message}
                  </span>
                )}
                <FiMinusCircle
                  size={30}
                  className="ml-2 text-red-500 hover:text-red-600 hover:cursor-pointer"
                  onClick={() => remove(index)}
                />
              </div>
            </FormRow>
          ))
        )}
        <FormRow>
          <Button
            type="button"
            onClick={() => append({ category: "" })}
            disabled={isAddingSubCategory || isUpdatingSubCategory}
          >
            Add Category
          </Button>
        </FormRow>
        <FormRow>
          <Button
            type="reset"
            variation="reset"
            disabled={isLoading || isAddingSubCategory || isUpdatingSubCategory}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={
              isLoading ||
              isUploading ||
              isAddingSubCategory ||
              isUpdatingSubCategory
            }
          >
            {isEditSession ? "Update" : "Submit"}
          </Button>
        </FormRow>
      </Form>
    </Modal>
  );
}

export default CreateSubCategoryForm;
