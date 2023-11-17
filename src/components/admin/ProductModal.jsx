import React, { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../../firebase";
import axios from "axios";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 50%;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelContainer = styled.label`
  margin-top: 15px;
  width: 90%;
`;
const Label = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 10px;
`;
const RowContainer = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background-color: teal;
  color: white;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 10px;
`;

const ProductModal = ({ setOpenProductModal, setProducts, products = [], modalDetails = {} }) => {
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState(modalDetails);

  const handleUploadClick = (e) => {
    const fileName = new Date().getTime() + file.name || "";
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          const productBody = product;
          productBody.size = product.size
            .split(",")
            .filter((item) => item.length > 0)
            .map((item) => item.trim());
          productBody.color = product.color
            .split(",")
            .filter((item) => item.length > 0)
            .map((item) => item.trim());
          productBody.category = product.category
            .split(",")
            .filter((item) => item.length > 0)
            .map((item) => item.trim());
          productBody.image = [downloadURL];

          const url = "http://localhost:8080/api/product/";
          axios
            .post(url, productBody)
            .then((response) => {
              console.log("response is", response);
              setProducts([...products, response.data])
              setOpenProductModal(false);
            })
            .catch((err) => {
              console.log("error is", err);
            });
        });
      }
    );
  };

  return (
    <React.Fragment>
      <ModalBackground>
        <ModalContent>
          <h2>Add Product</h2>
          <LabelContainer>
            <Label>Name:</Label>
            <Input
              type="text"
              name="name"
              value={product?.title || ""}
              onChange={(e) => {
                setProduct({ ...product, title: e.target.value });
              }}
            />
          </LabelContainer>

          <LabelContainer>
            <Label>Description:</Label>
            <Textarea
              name="description"
              value={product?.description || ""}
              onChange={(e) => {
                setProduct({ ...product, description: e.target.value });
              }}
            />
          </LabelContainer>

          <LabelContainer>
            <RowContainer>
              <ColumnContainer>
                <Label>Price:</Label>
                <Input
                  type="number"
                  name="price"
                  value={product?.price || ""}
                  onChange={(e) => {
                    setProduct({ ...product, price: e.target.value });
                  }}
                />
              </ColumnContainer>

              <ColumnContainer>
                <Label>Quantity:</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={product?.quantity || ""}
                  onChange={(e) => {
                    setProduct({ ...product, quantity: e.target.value });
                  }}
                />
              </ColumnContainer>
            </RowContainer>
          </LabelContainer>

          <LabelContainer>
            <Label>Size:</Label>
            <Input
              type="text"
              name="size"
              value={product?.size || ""}
              onChange={(e) => {
                console.log();
                setProduct({
                  ...product,
                  size: e.target.value,
                });
              }}
            />
          </LabelContainer>

          <LabelContainer>
            <Label>Color:</Label>
            <Input
              type="text"
              name="color"
              value={product?.color || ""}
              onChange={(e) => {
                console.log();
                setProduct({
                  ...product,
                  color: e.target.value,
                });
              }}
            />
          </LabelContainer>

          <LabelContainer>
            <Label>Category:</Label>
            <Input
              type="text"
              name="category"
              value={product?.category || ""}
              onChange={(e) => {
                console.log();
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
            />
          </LabelContainer>

          <LabelContainer>
            <Label>Images:</Label>
            <FileLabel htmlFor="imageUpload">Upload Image</FileLabel>
            <FileInput
              type="file"
              id="imageUpload"
              name="image"
              accept="image/jpeg, image/jpg, image/png"
              // onClick={ handleUploadClick }
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </LabelContainer>
          <RowContainer>
            <Button onClick={() => setOpenProductModal(false)}>Close</Button>
            <Button onClick={handleUploadClick}>Save</Button>
          </RowContainer>
        </ModalContent>
      </ModalBackground>
    </React.Fragment>
  );
};

export default ProductModal;
