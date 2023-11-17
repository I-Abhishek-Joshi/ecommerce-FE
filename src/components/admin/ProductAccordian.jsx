import React, { useState } from "react";
import styled from "styled-components";
import "../../globalStyle.css";
import AdminProductDetails from "./AdminProductDetails";

const AccordionWrapper = styled.div`
  width: 100%;
`;

const AccordionRow = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  background-color: #fafafa;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  justify-content: center;
`;

const ProductImage = styled.img`
  max-width: 40px;
  max-height: 40px;
  margin-right: 10px;
`;

const ProductContent = styled.span`
  font-weight: bold;
  flex: 1;
  text-align: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductAccordion = ({ products, setOpenProductModal, setModalDetails }) => {
    console.log(products);
  const [openRow, setOpenRow] = useState([]);

  const toggleRow = (pid) => {
    if (openRow.includes(pid)) {
      setOpenRow(openRow.filter((id) => id !== pid));
    } else {
      setOpenRow([...openRow, pid]);
    }
  };

  return (
    <AccordionWrapper>
      <AccordionRow
        style={{
          marginBottom: "12px",
          padding: "8px",
          boxSizing: "border-box",
        }}
      >
        <RowHeader>
          <ProductContent>Id</ProductContent>
          <ProductContent>Product</ProductContent>
          <ProductContent>Stock Quantity</ProductContent>
          <ProductContent>Price</ProductContent>
        </RowHeader>
      </AccordionRow>
      {products.productList?.map((product,index) => (
        <AccordionRow key={product.productId+index} className="adminProductList">
          <ColumnContainer>
            <RowHeader onClick={() => toggleRow(product._id)}>
              <ProductContent>{product._id}</ProductContent>

              <ProductContent
                style={{
                  marginRight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ProductImage
                  src={product.image}
                  alt={product.title}
                />
                {product.title}
              </ProductContent>
              <ProductContent>{product.quantity}</ProductContent>
              <ProductContent>Rs {product.price}</ProductContent>
              <ProductContent>
                {openRow.includes(product._id) ? "-" : "+"}
              </ProductContent>
            </RowHeader>
            <AdminProductDetails
              isOpen={openRow.includes(product._id)}
              product={product}
              setOpenProductModal = { setOpenProductModal }
              setModalDetails = {setModalDetails}
            />
          </ColumnContainer>
        </AccordionRow>
      ))}
    </AccordionWrapper>
  );
};

export default ProductAccordion;
