import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { shopAction } from "../action/shopAction";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART_QUANTITY,
  GET_CART_DETAILS_FAILURE,
  GET_CART_DETAILS_PENDING,
  GET_CART_DETAILS_SUCCESS,
  UPDATE_CART_QUANTITY,
} from "../action/actionTypes";
import axios from "axios";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;



const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartDetails =
    useSelector((state) => state?.cartDetails?.cartDetails) || {};

  const getCartDetails = async () => {
    dispatch(shopAction(GET_CART_DETAILS_PENDING));
    // todo: take userId from redux after auth
    const userId = "653e790709035ebc8e5b8ab4";
    const url = "http://localhost:8080/api/cart/find/";

    try {
      const response = await axios.get(url + userId);
      dispatch(shopAction(GET_CART_DETAILS_SUCCESS, response.data));
      dispatch(shopAction(UPDATE_CART_QUANTITY, 0))
      console.log('data of cart', response.data);
    } catch (err) {
      dispatch(shopAction(GET_CART_DETAILS_FAILURE, {}));
      console.log("error getting user cart value", err);
    }
  };

  const clearCart = async () => {
    // todo: take userId from redux after auth
    const userId = "653e790709035ebc8e5b8ab4";
    const url = "http://localhost:8080/api/cart/clearCart/";
    try {
      const response = await axios.patch(url + userId);
      dispatch(shopAction(GET_CART_DETAILS_SUCCESS, response.data));
      dispatch(shopAction(CLEAR_CART_QUANTITY))
      console.log('cleared cart data', response.data);
    } catch (err) {
      dispatch(shopAction(GET_CART_DETAILS_FAILURE, {}));
      console.log("error clearing cart data", err);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getCartDetails();
  }, []);

  return (
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => navigate("/")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cartDetails?.products?.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
            <TopText onClick={ clearCart }>clear cart</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartDetails.products &&
              cartDetails.products.map((detail, index, array) => (
                <React.Fragment key={detail.product._id}>
                  <CartItems
                    product={detail.product}
                    color={detail.color}
                    size={detail.size}
                    quantity={detail.quantity}
                  />
                  {index !== array.length - 1 && <Hr />}
                </React.Fragment>
              ))}
          </Info>
         <CartSummary products = { cartDetails.products }/>
        </Bottom>
      </Wrapper>
  );
};

export default Cart;
