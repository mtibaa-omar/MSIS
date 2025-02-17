import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "./Button";
import { FaExclamationTriangle } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: 400,
    sm: 450,
  },
  bgcolor: "#1f2937",
  color: "white",
  border: "2px solid #2B3040",
  borderRadius: 2,
  boxShadow: 24,
  p: "1.2rem",
};

export default function ConfirmDelete({ handleClose, deleteFct, isDeleting }) {
  document.body.style.overflow = "hidden";

  function handleDelete() {
    deleteFct({
      onSettled: () => {
        handleClose();
        document.body.style.overflow = "";
      },
    });
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={false}
    >
      <Box sx={style}>
        <div className="flex items-center justify-center gap-5">
          <div className="flex items-center justify-center mx-auto bg-red-100 rounded-full size-12 shrink-0 sm:mx-0 sm:size-12">
            <FaExclamationTriangle
              aria-hidden="true"
              className="text-red-600 size-6"
            />
          </div>
          <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Confirm Delete
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="body2"
              sx={{ color: "#9ca3af", margin: "10px 0" }}
            >
              Are you sure you want to delete this category permanently? This
              action cannot be undone.
            </Typography>
          </div>
        </div>
        <div className="text-right text-white">
          <Button
            disabled={isDeleting}
            variation="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variation="danger"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
