import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useSubCategories } from "./useSubCategories";
import { useDeleteSubCategory } from "./useDeleteSubCategory";
import SubCategoryCard from "./SubCategoryCard";
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
function SubCategoryTable() {
  const { isLoadingSub, subCategories } = useSubCategories();
  const { isDeletingSubCategory, deleteSubCategory } = useDeleteSubCategory();
  if (isLoadingSub) return <Spinner />;
  return (
    <>
      {subCategories?.length === 0 ? (
        <Empty>No data to show at the moment</Empty>
      ) : (
        <div className="grid grid-cols-1 gap-8 p-4 overflow-hidden md:grid-cols-4 ">
          {subCategories.map((categoryItem) => {
            return (
              <SubCategoryCard
                category={categoryItem}
                key={categoryItem._id}
                deleteFct={deleteSubCategory}
                isDeleting={isDeletingSubCategory}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default SubCategoryTable;
