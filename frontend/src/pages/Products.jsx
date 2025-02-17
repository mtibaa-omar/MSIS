import { Divider, Typography } from "@mui/material";
import Input from "../ui/Input";
import ProductsTable from "../features/dashboard/ProductsTable";
import { useState } from "react";

function Products() {
  const [search, setSearch] = useState();

  return (
    <div>
      <div className="flex justify-between pb-1">
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Products
        </Typography>
        <Input
          placeholder="Search for you product"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Divider />
      <ProductsTable search={search} />
    </div>
  );
}

export default Products;
