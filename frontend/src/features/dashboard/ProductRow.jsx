import styled from "styled-components";

import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const ProductName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  overflow-x: scroll;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 12rem;
`;

const Price = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;
const Description = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-600);
  max-height: 3em;
  overflow-y: auto;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;
const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ product, isMobile }) {
  const {
    _id: productId,
    name,
    images,
    discount,
    price,
    description,
  } = product;

  return (
    <Table.Row>
      <Img src={images[0]} />
      <ProductName>{name}</ProductName>
      {!isMobile && <Description>{description}</Description>}
      <Price>{formatCurrency(price)}</Price>
      {!isMobile &&
        (+discount ? <Discount>{discount}</Discount> : <span>&mdash;</span>)}
      {!isMobile && <div></div>}
    </Table.Row>
  );
}

export default CabinRow;
