import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import {
  GET_PRODUCTLIST_PENDING,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_PENDING,
  GET_PRODUCT_SUCCESS,
  UPDATE_CART_QUANTITY,
} from "../action/actionTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shopAction } from "../action/shopAction";
import axios from "axios";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const FilterColorContainer = styled.div`
  border: 1px solid black;
  padding: 5px;
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const productDetails =
    useSelector((state) => state?.productDetails.productDetails) || {};

  const fetchProductDetails = async () => {
    const base_url = "http://localhost:8080/api/product/find/";

    dispatch(shopAction(GET_PRODUCTLIST_PENDING));

    try {
      axios
        .get(`${base_url}${id}`)
        .then((response) => {
          if (
            response.data &&
            response.data.size &&
            response.data.size.length > 0
          ) {
            setSize(response.data.size[0]);
          }
          dispatch(shopAction(GET_PRODUCT_SUCCESS, response.data));
        })
        .catch((err) => {
          dispatch(shopAction(GET_PRODUCT_FAILURE, {}));
          console.log("err", err);
        });
    } catch (err) {
      console.log("error while calling shop api", err);
    }
  };

  const addItemToCart = async () => {
    //todo:
    // need to get cartId, userId from cookies if user is logged in else temporary;
    // is this the correct way to do it?

    const userId = '653e790709035ebc8e5b8ab4';
    const url = "http://localhost:8080/api/cart/addToCart/";


    const cartBody = {
      userId,
      products: [
          {
              product: {
                  _id: productDetails._id
              },
              quantity: quantity,
              size: size,
              color: color
          }
      ]
  }
    
    console.log("adding", url+userId);
    try {
      const response = await axios.patch(url+userId, cartBody);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const handleQuantityChange = (type) => {
    if (type === "decrease") {
      setQuantity(quantity === 1 ? 1 : quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleAddToCart = async () => {
    if (size && color) {
      await addItemToCart()
        .then(() => {
          dispatch(shopAction(UPDATE_CART_QUANTITY, quantity));
          setQuantity(1);
          setColor("");
        })
        .catch((err) => {
          console.log("err adding data", err);
        });
    } else {
      console.log("error adding to cart");
    }
  };

  const handleFilterClick = (type, value) => {
    if (type === "color") {
      setColor(value);
    } else {
      setSize(value);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductDetails();
  }, []);

  return (
    <Wrapper>
      <ImgContainer>
        <Image src={productDetails?.image} />
      </ImgContainer>
      <InfoContainer>
        <Title>{productDetails?.title}</Title>
        <Desc>{productDetails?.description}</Desc>
        <Price>$ {productDetails?.price}</Price>
        <FilterContainer>
          <Filter>
            <FilterTitle>Color</FilterTitle>
            {productDetails?.color?.map((clr) => (
              <FilterColorContainer
                style={{
                  borderWidth: `${color === clr ? "2.5px" : "1px"}`,
                }}
                onClick={() => handleFilterClick("color", clr)}
              >
                <FilterColor color={clr} />
              </FilterColorContainer>
            ))}
          </Filter>
          <Filter>
            <FilterTitle>Size</FilterTitle>
            <FilterSize
              onChange={(e) => handleFilterClick("size", e.target.value)}
            >
              {productDetails?.size?.map((sz) => (
                <FilterSizeOption value={sz}>{sz}</FilterSizeOption>
              ))}
            </FilterSize>
          </Filter>
        </FilterContainer>
        <AddContainer>
          <AmountContainer>
            <Remove onClick={() => handleQuantityChange("decrease")} />
            <Amount> {quantity} </Amount>
            <Add onClick={() => handleQuantityChange("increase")} />
          </AmountContainer>
          <Button onClick={handleAddToCart}>ADD TO CART</Button>
        </AddContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default Product;
