import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useCategories } from "./useCategories";
import CategoryCard from "./CategoryCard";
import { useDeleteCategory } from "./useDeleteCategory";
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
function CategoryTable() {
  const { isLoading, categories } = useCategories();
  const { isDeletingSubCategory, deleteCategory } = useDeleteCategory();
  if (isLoading) return <Spinner />;
  return (
    <>
      {categories?.length === 0 ? (
        <Empty>No data to show at the moment</Empty>
      ) : (
        <div className="grid grid-cols-1 gap-8 p-4 overflow-hidden md:grid-cols-4 ">
          {categories.map((categoryItem) => {
            return (
              <CategoryCard
                category={categoryItem}
                key={categoryItem._id}
                deleteFct={deleteCategory}
                isDeleting={isDeletingSubCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default CategoryTable;
