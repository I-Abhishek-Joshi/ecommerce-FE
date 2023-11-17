import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductModal from "../../components/admin/ProductModal";
import AdminProduct from "./AdminProduct";
import AdminFLyout from "../../components/admin/AdminFlyout";
import axios from "axios";

const Container = styled.div`
  display: flex;
`;

const Flyout = styled.div`
`;
const PageContainer = styled.div`
flex: 1;
`;
const Admin = () => {
  const [openProductModal, setOpenProductModal] = useState(false);
  const [modalDetails, setModalDetails] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const url = "http://localhost:8080/api/product"
      const response = await axios.get(url);
      setProducts(response.data)
    }

    getProducts();


    setProducts([
      {
        _id: "654805eeaf4ed9f659ceed23",
        description: "very good tshirt",
        productId: "1234",
        title: "shirt",
        quantity: 500,
        price: 200,
        productImage:
          "https://firebasestorage.googleapis.com/v0/b/shop-2be56.appspot.com/o/1699218921473Screenshot%202023-10-12%20at%2011.37.55%20PM.png?alt=media&token=71d6461b-59ca-4a59-b0da-633da056f923",
      },
    ]);
  }, []);

  return (
    <Container>
      <Flyout>
          <AdminFLyout/>
        </Flyout>
      <PageContainer>
        <AdminProduct
          setOpenProductModal={setOpenProductModal}
          setModalDetails={setModalDetails}
          products={products}
        />
      </PageContainer>
      {openProductModal && (
        <ProductModal
          setOpenProductModal={setOpenProductModal}
          products={products}
          setProducts={setProducts}
          modalDetails={modalDetails}
        />
      )}
    </Container>
  );
};

export default Admin;
