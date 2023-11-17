import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shopAction } from "../action/shopAction";
import { UPDATE_CART_QUANTITY } from "../action/actionTypes";
import axios from "axios";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  height: 25px;
  font-size: 16px;
  width: 100%;
  padding-left: 10px;
  ${mobile({ width: "50px", paddingLeft: "5px", fontSize: "12px" })}
`;

const Center = styled.div`
  flex: 1;
  margin: auto;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartQuantity = useSelector((state) => state?.cart?.quantity) || 0;

  const navigateToPage = (type) => {
    navigate(`/${type}`)
  }

  const getCartDetails = async () => {
    // todo: take userId from redux after auth
    const userId = '653e790709035ebc8e5b8ab4';
    const url = 'http://localhost:8080/api/cart/find/';

    try {
      const response = await axios.get(url + userId); 
      const value = response.data.products.reduce((sum, product) => sum + product.quantity, 0)
      dispatch(shopAction(UPDATE_CART_QUANTITY, value)) 
    } catch (err) {
      console.log('error getting user cart value',err);
    }
    
  }

  useEffect(() => {
    getCartDetails()
  },[])

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            LOWE'S
          </Logo>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "gray", fontSize: 20, marginLeft: "5px" }}
            />
          </SearchContainer>
        </Center>
        <Right>
          <MenuItem onClick = { () => navigateToPage('register') }>REGISTER</MenuItem>
          <MenuItem onClick = { () => navigateToPage('login') }>SIGN IN</MenuItem>
          <MenuItem onClick = { () => navigateToPage('cart') }>
            <Badge badgeContent={cartQuantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
