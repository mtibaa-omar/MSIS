import { useState } from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

function ProductCard({ product, deleteFct, isDeleting }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleClose = () => {
    setOpenEdit(false);
  };
  const handleDelete = () => {
    deleteFct({ productId: product?._id });
  };
  return (
    <>
      <div className="px-3 py-8 rounded-md shadow-md sm:p-3 w-42">
        <img
          alt={product.name}
          src={product.images[0]}
          className="object-scale-down w-full"
        />
        <div className="flex flex-col gap-6">
          <div className="text-xl font-bold text-center text-gray-500">
            {product.name}
          </div>
          <div className="flex items-center justify-center gap-2 h-9">
            <button
              onClick={() => setOpenEdit(true)}
              className="p-4 font-bold text-green-600 bg-green-100 rounded-full md:p-3 hover:bg-green-200"
            >
              <MdOutlineModeEditOutline className="w-8 h-8 sm:w-7 sm:h-7 md:w-7 md:h-6" />
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              disabled={isDeleting}
              className="p-4 font-medium text-red-600 bg-red-100 rounded-full md:p-3 hover:bg-red-200"
            >
              <TiDeleteOutline className="w-8 h-8 sm:w-7 sm:h-7 md:w-7 md:h-7" />
            </button>
          </div>
        </div>
      </div>
      <CreateCategoryForm
        open={openEdit}
        categoryToEdit={product}
        closeModal={handleClose}
      />
      {openDelete && (
        <ConfirmDelete
          deleteFct={handleDelete}
          handleClose={() => setOpenDelete(false)}
          disabled={isDeleting}
        />
      )}
    </>
  );
}

export default ProductCard;
