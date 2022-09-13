import React from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import "./Home.css";
import datas from "../data.js";
import Product from "./Product";
function Home() {
  const bannerImages = [
    "https://m.media-amazon.com/images/I/61jovjd+f9L._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/717OO5QwJnL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/71qid7QFWJL._SX3000_.jpg",
    "https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg",
  ];
  const [bannerImg, setBannerImg] = React.useState(bannerImages[0]);
  const slideLeft = () => {
    setBannerImg((prevBanner) => {
      let bannerIndex = bannerImages.indexOf(prevBanner);

      return bannerIndex > 0 ? bannerImages[bannerIndex - 1] : bannerImages[3];
    });
  };
  const slideRight = () => {
    setBannerImg((prevBanner) => {
      let bannerIndex = bannerImages.indexOf(prevBanner);

      return bannerIndex < 3 ? bannerImages[bannerIndex + 1] : bannerImages[0];
    });
  };
  return (
    <div className="home">
      <div className="home__content">
        <img src={bannerImg} alt="home_image" className="home_img" />
        <div className="backward_icon">
          <ArrowBackIosNewOutlinedIcon fontSize="" onClick={slideLeft} />
        </div>
        <div className="forward_icon">
          <ArrowForwardIosOutlinedIcon fontSize="" onClick={slideRight} />
        </div>
      </div>

      <div className="product_details">
        {datas.map((data) => (
          <Product
            key={data.id}
            img={data.image}
            price={data.price}
            rating={data.rating}
            title={data.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
