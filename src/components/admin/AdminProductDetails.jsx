import React from "react";
import styled from "styled-components";

const DetailWrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  display: ${({ isOpen }) => (isOpen ? "grid" : "none")};
`;

const DetailLabel = styled.p`
  font-weight: bold;
  margin-bottom: 3px;
`;

const DetailValue = styled.p`
  margin-bottom: 20px;
`;

const DisplayContainer = styled.div``;

const Image = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-right: 10px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
`;

const AdminProductDetails = ({ isOpen, product, setOpenProductModal, setModalDetails}) => {
 
    const handleEditClick = () => {
        setOpenProductModal(true);
        setModalDetails(product);
    }

  return (
    <DetailWrapper isOpen={isOpen}>
      <DisplayContainer>
        <DetailLabel>Name:</DetailLabel>
        <DetailValue>{product.productName}</DetailValue>
      </DisplayContainer>

      <DisplayContainer>
        <DetailLabel>Description:</DetailLabel>
        <DetailValue>{product.description}</DetailValue>
      </DisplayContainer>
      <RowContainer>
        <DisplayContainer>
          <DetailLabel>Price:</DetailLabel>
          <DetailValue>{product.price}</DetailValue>
        </DisplayContainer>
        <DisplayContainer>
          <DetailLabel>Quantity:</DetailLabel>
          <DetailValue>{product.quantity}</DetailValue>
        </DisplayContainer>
        <DisplayContainer>
          <DetailLabel>Color:</DetailLabel>
          <DetailValue>{product.color?.join(", ")}</DetailValue>
        </DisplayContainer>
        <DisplayContainer>
          <DetailLabel>Size:</DetailLabel>
          <DetailValue>{product.size?.join(", ")}</DetailValue>
        </DisplayContainer>
        <DisplayContainer>
          <DetailLabel>Category:</DetailLabel>
          <DetailValue>{product.category?.join(", ")}</DetailValue>
        </DisplayContainer>
      </RowContainer>

      <DetailLabel>Images:</DetailLabel>
      <Image src={product.image} alt={product.title} />

      <RowContainer style={{justifyContent: "flex-end"}}>
        <Button onClick={handleEditClick}>Edit</Button>
      </RowContainer>
    </DetailWrapper>
  );
};

export default AdminProductDetails;
