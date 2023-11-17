import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "@mui/icons-material";
import { mobile } from "../../responsive";
import ProductAccordion from "../../components/admin/ProductAccordian";

const Container = styled.div``;

const TopBarContainer = styled.div`
  color: white;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 200px;
  ${mobile({ margin: 0 })}
`;

const Input = styled.input`
  width: 100%;
  font-size: 15px;
  padding: 10px;
  margin-right: 10px;
  ${mobile({ marginRight: 0 })}
`;

const Button = styled.button`
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  ${mobile({ padding: "12px", marginLeft: "5px" })}
`;

const TableContent = styled.div`
  width: 80%;
  margin: auto;
`;

const AdminProduct = ({ setOpenProductModal, products, setModalDetails }) => {
  return (
    <Container>
      <TopBarContainer>
        <SearchContainer>
          <Input placeholder="Search" />
          <Search style={{ color: "gray", fontSize: 20, marginLeft: "10px" }} />
        </SearchContainer>
        <Button onClick={() => setOpenProductModal(true)}>Add Product</Button>
      </TopBarContainer>
      <TableContent>
        <ProductAccordion
          products={products}
          setOpenProductModal={setOpenProductModal}
          setModalDetails={setModalDetails}
        />
      </TableContent>
    </Container>
  );
};

export default AdminProduct;
