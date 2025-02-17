import CreateProductForm from "../features/dashboard/CreateProductForm";
import { Divider, Typography } from "@mui/material";

function UploadProduct() {
  return (
    <div>
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
      >
        Upload a Product
      </Typography>
      <Divider />
      <CreateProductForm />
    </div>
  );
}

export default UploadProduct;
