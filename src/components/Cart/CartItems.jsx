import React from "react";
import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../../responsive";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const ClearItem = styled.div`
  text-decoration: underline;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CartItems = ({ product, color, size, quantity }) => {
  return (
    <Product>
      <ProductDetail>
        <Image src={product.image} />
        <Details>
          <ProductName>
            <b>Product:</b> {product.title}
          </ProductName>
          <ProductId>
            <b>ID:</b> {product._id}
          </ProductId>
          <ProductColor color="black" />
          <ProductSize>
            <b>Size:</b> {size}
          </ProductSize>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ClearItem>clear</ClearItem>
        <ProductAmountContainer>
          <Add />
          <ProductAmount>{quantity}</ProductAmount>
          <Remove />
        </ProductAmountContainer>
        <ProductPrice>$ {product.price}</ProductPrice>
      </PriceDetail>
    </Product>
  );
};

export default CartItems;
