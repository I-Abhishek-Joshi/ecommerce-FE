import styled from "styled-components";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopAction } from "../action/shopAction";
import queryString from "query-string";
import {
  GET_PRODUCTLIST_FAILURE,
  GET_PRODUCTLIST_PENDING,
  GET_PRODUCTLIST_SUCCESS,
  UPDATE_SHOP_QUERY,
} from "../action/actionTypes";
import axios from "axios";
import { sortMethods } from "../utils/constants";
import { isUnequalParams } from "../utils/shopUtils";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;


//todo
/*
  component is getting rendered multiple times as call is happening from the FE side and has multiple 
  useEffect 
  need to check


  colorList, sizeList is getting changed but why that is re rendering the whole page

*/
const ProductList = () => {

  console.log("Loading ProductListttttt");
  const dispatch = useDispatch();
  const params = useParams();

  const query = useSelector((state) => state?.query) || {};
  const colorList = useSelector((state) => state?.productList?.productList?.colorList) || [];
  const sizeList = useSelector((state) => state?.productList?.productList?.sizeList) || [];
  let initialParams;

  if(!(colorList || colorList[0] === 'Color')) {
    colorList.unshift('Color')
  } 
  if(!(sizeList || sizeList[0] === 'Color')) {
    sizeList.unshift('Size')
  } 
  
  

  const shopListUpdate = async () => {
    const base_url = "http://localhost:8080/api/product";
    const apiQuery = {... query, category: params.id}
    const param_url = queryString.stringify(apiQuery).replace("%20", " ");

    dispatch(shopAction(GET_PRODUCTLIST_PENDING));

    try {
      console.log("request", `${base_url}?${param_url}`);
      axios
        .get(`${base_url}?${param_url}`)
        .then((response) => {
          dispatch(shopAction(GET_PRODUCTLIST_SUCCESS, response.data));
        })
        .catch((err) => {
          // dispatch(shopAction(GET_PRODUCTLIST_FAILURE, []));
          console.log("err", err);
        });
    } catch (err) {
      console.log("error while calling shop api", err);
    }
  };

  const [filters, setFilters] = useState({
    color: "color",
    size: "size",
  });
  const [sort, setSort] = useState("newest");
  const category = location.pathname.split("/")[2];

  const handleFilterChange = (e) => {
    const value =
      e.target.value === "Color" || e.target.value === "Size"
        ? ""
        : e.target.value;

    const updatedFilters = { ...filters };
    if (value === "") {
      delete updatedFilters[e.target.name];
      delete query[e.target.name];
    } else {
      updatedFilters[e.target.name] = value;
      query[e.target.name] = value;
    }

    setFilters(updatedFilters);

    const url = `${window.location.pathname}?${queryString.stringify(query)}`;
    window?.history.pushState({}, "shop", url);
    dispatch(shopAction(UPDATE_SHOP_QUERY, query));
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    query.sort = e.target.value;
    const url = `${window.location.pathname}?${queryString.stringify(query)}`;
    window?.history.pushState({}, "shop", url);
    dispatch(shopAction(UPDATE_SHOP_QUERY, query));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    initialParams = queryString.parse(window?.location?.search) || {};
    dispatch(shopAction(UPDATE_SHOP_QUERY, initialParams));
  }, []);

  useEffect(() => {
    if(isUnequalParams(initialParams, query)) {
      initialParams = null
      shopListUpdate();
    }
  }, [query]);

  return (
    <Container>
      <Title>{params.id}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilterChange}>
            {colorList.map((color) => (
              <Option key={ color }>{ color }</Option>
            ))}
          </Select>
          <Select name="size" onChange={handleFilterChange}>
          {sizeList.map((size) => (
              <Option key={ size }>{ size }</Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort}>
            {sortMethods.map((method) => (
              <Option value={method.value} key={method.value}> {method.name} </Option>
            ))}
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} category={category} sort={sort} />
    </Container>
  );
};

export default ProductList;
