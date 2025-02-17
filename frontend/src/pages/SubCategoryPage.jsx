import { Divider, Typography } from "@mui/material";
import Button from "../ui/Button";
import { useState } from "react";
import CreateSubCategoryForm from "../features/dashboard/CreateSubCategoryForm";
import SubCategoryTable from "../features/dashboard/SubCategoryTable";

function SubCategoryPage() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <div className="flex items-center justify-between gap-2 lg:max-w-7xl">
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sub Category
        </Typography>
        <Button className="mt-2 text-nowrap" onClick={handleOpen}>
          Add Category
        </Button>
      </div>
      <Divider />
      <CreateSubCategoryForm open={open} closeModal={handleClose} />
      <SubCategoryTable />
    </div>
  );
}

export default SubCategoryPage;
