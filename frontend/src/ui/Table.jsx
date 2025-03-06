import { createContext, useContext } from "react";
import styled from "styled-components";
import { useColorScheme } from "@mui/material/styles";

const StyledTable = styled.div`
  border: 1px solid ${(props) => (props.$isDark ? "#030712" : "#e5e7eb")};
  font-size: 1.4rem;
  background-color: ${(props) => (props.$isDark ? "#121212" : "#ffffff")};
  border-radius: 7px;
  overflow: hidden;
  width: 95%;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    border-radius: 5px;
  }
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  @media (max-width: 600px) {
    column-gap: 1.2rem;
    padding: 0.8rem;
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: ${(props) => (props.$isDark ? "#121212" : "#f9fafb")};
  border-bottom: 1px solid ${(props) => (props.$isDark ? "#030712" : "#e5e7eb")};
  text-transform: capitalize;
  letter-spacing: 0.4px;
  font-family: sans-serif;
  font-weight: 600;
  color: ${(props) => (props.$isDark ? "#ffffff" : "#030712")};
  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 1.2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  @media (max-width: 600px) {
    margin: 0.2rem 0;
  }
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  color: ${(props) => (props.$isDark ? "#ffffff" : "#030712")};

  &:not(:last-child) {
    border-bottom: 1px solid
      ${(props) => (props.$isDark ? "#030712" : "#e5e7eb")};
  }
  @media (max-width: 600px) {
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
  }
`;

const Footer = styled.footer`
  background-color: ${(props) => (props.$isDark ? "#1f2937" : "#f9fafb")};
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  &:not(:has(*)) {
    display: none;
  }
  @media (max-width: 600px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: ${(props) => (props.$isDark ? "#ffffff" : "#030712")};
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin: 1.6rem;
  }
`;

const TableContext = createContext();

function Table({ children, columns }) {
  const { mode } = useColorScheme();
  const isDark = mode === "dark";

  return (
    <TableContext.Provider value={{ columns, isDark }}>
      <StyledTable role="table" $isDark={isDark}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, isDark } = useContext(TableContext);
  return (
    <StyledHeader role="row" $columns={columns} $isDark={isDark} as="header">
      {children}
    </StyledHeader>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

function Row({ children }) {
  const { columns, isDark } = useContext(TableContext);
  return (
    <StyledRow role="row" $columns={columns} $isDark={isDark}>
      {children}
    </StyledRow>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
