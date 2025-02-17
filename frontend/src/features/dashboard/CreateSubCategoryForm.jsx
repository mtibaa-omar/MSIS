// import { useAddSubCategory } from "./useAddSubCategory";
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

function CreateSubCategoryForm({ open, closeModal }) {
  const isEditSession = false;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { isLoading, categories } = useCategories();
  const { isUploading, uploadImage } = useUploadImage();
  const { isAddingSubCategory, addSubCategory } = useAddSubCategory();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "category",
  });
  function onSubmit(dataForm) {
    const category =
      dataForm.category.length > 0 ? JSON.parse(dataForm.category) : [];
    const formData = new FormData();
    const image = dataForm.image[0];
    formData.append("image", image);
    if (!isEditSession) {
      uploadImage(formData, {
        onSuccess: ({ data: imageData }) => {
          addSubCategory(
            {
              name: dataForm.name,
              image: imageData.data[0],
              category,
            },
            {
              onSuccess: () => {
                closeModal?.();
                reset();
                remove();
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
            disabled={isUploading || isAddingSubCategory}
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
            disabled={isUploading || isAddingSubCategory}
            type="file"
            {...register("image", {
              required: "This field is required",
            })}
          />
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
                disabled={isUploading || isAddingSubCategory}
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
            onClick={() => {
              append({ category: "" });
            }}
            disabled={isAddingSubCategory}
          >
            Add Category
          </Button>
        </FormRow>
        <FormRow>
          <Button
            type="reset"
            variation="reset"
            disabled={isLoading || isAddingSubCategory}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || isUploading || isAddingSubCategory}
          >
            Submit
          </Button>
        </FormRow>
      </Form>
    </Modal>
  );
}

export default CreateSubCategoryForm;
