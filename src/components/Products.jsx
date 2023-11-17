import styled from "styled-components";
import Product from "./Product";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

//search, color, size, sort

const Products = () => {
  const productList =
    useSelector((state) => state?.productList?.productList?.productList) || [];
  return (
    <Container>
      {productList.map((item) => (
        <Link to={`/product/${item._id}`} key={item._id}>
          <Product item={item} />
        </Link>
      ))}
    </Container>
  );
};

export default Products;
