import { Modal } from "@mui/material";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { useState } from "react";
import { useUploadImage } from "./useUploadImage";
import { useAddCategory } from "./useAddCategory";
import { useEditCategory } from "./useEditCategory";

function CreateCategoryForm({ open, categoryToEdit = {}, closeModal }) {
  const isEditSession = Boolean(categoryToEdit?._id);

  const [name, setName] = useState(categoryToEdit?.name || "");
  const [image, setImage] = useState("");
  const { isUploading, uploadImage } = useUploadImage();
  const { isAddingCategory, addCategory } = useAddCategory();
  const { isEditingCategory, editCategory } = useEditCategory();
  const isWorking = isAddingCategory || isEditingCategory;

  const errors = {};
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    if (image.length > 0) {
      image.forEach((image) => {
        formData.append("image", image);
      });
    }
    if (isEditSession) {
      if (image.length > 0) {
        uploadImage(formData, {
          onSuccess: (data) => {
            editCategory(
              {
                name,
                image: data.data.data[0],
                categoryId: categoryToEdit?._id,
              },
              {
                onSuccess: () => {
                  setImage("");
                  setName("");
                  closeModal?.();
                },
                onError: (error) => {
                  console.error("Failed to edit category:", error);
                },
              }
            );
          },
          onError: (err) => {
            console.error("Upload failed:", err);
          },
        });
      } else {
        editCategory(
          {
            name,
            image: categoryToEdit.image,
            categoryId: categoryToEdit?._id,
          },
          {
            onSuccess: () => {
              setImage("");
              closeModal();
              setName("");
            },
            onError: (error) => {
              console.error("Failed to edit category:", error);
            },
          }
        );
      }
    } else {
      if (!name || !image) return;
      uploadImage(formData, {
        onSuccess: (data) => {
          addCategory(
            { name, image: data.data.data[0] },
            {
              onSuccess: () => {
                setImage("");
                closeModal?.();
                setName("");
              },
              onError: (error) => {
                console.error("Failed to add category:", error);
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

  const handleOnChange = (e) => {
    setName(e.target.value);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImage(files);
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Form onSubmit={handleSubmit} type="modal">
        <div className="text-4xl font-bold font-robotoMono">
          {isEditSession ? "Edit Category" : "Add Category"}
        </div>
        <FormRow label="Category Name" error={errors?.categoryName?.message}>
          <Input
            name="name"
            value={name}
            id="categoryName"
            autoComplete="off"
            disabled={isUploading || isWorking}
            onChange={handleOnChange}
          />
        </FormRow>

        <FormRow label="Category image">
          <FileInput
            id="categoryImage"
            accept="image/*"
            type="file"
            multiple
            onChange={handleImageChange}
          />
        </FormRow>

        <FormRow>
          <Button
            type="reset"
            variation="reset"
            disabled={isUploading || isWorking}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isUploading || isWorking}>
            Submit
          </Button>
        </FormRow>
      </Form>
    </Modal>
  );
}

export default CreateCategoryForm;
