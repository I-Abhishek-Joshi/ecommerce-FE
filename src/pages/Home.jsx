import React, { useEffect } from "react";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";

const Home = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("api call taking place");
  },[])

  return (
    <div>
      <Slider />
      <Categories />
      <Newsletter />
    </div>
  );
};

export default Home;
