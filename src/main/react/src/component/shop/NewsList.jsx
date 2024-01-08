import React, { useState, useEffect } from "react";
import AxiosApi from "../../axios/ProductAxios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewsList = () => {
  const [list, setList] = useState([]);

  const testList = async () => {
    const response = await AxiosApi.newsGet();
    setList(response.data);
  };

  const NextArrow = (props) => (
    <div className="nextArrow" onClick={props.onClick}>
      ＞
    </div>
  );

  const PrevArrow = (props) => (
    <div className="prevArrow" onClick={props.onClick}>
      ＜
    </div>
  );

  useEffect(() => {
    testList();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Slider {...settings}>
      {list.map((data, index) => (
        <div key={index} className="image-container">
          <img
            alt="testimg"
            src={data.newsImage}
            style={{ width: "400px", height: "300px" }}
            onDoubleClick={() => (window.location.href = data.newsLink)}
          />
          <h2 style={{ padding: "0 16px" }}>{data.newsTitle}</h2>
          <p style={{ padding: "0 16px" }}>👍🏻 {data.newsLikes}</p>
        </div>
      ))}
    </Slider>
  );
};

export default NewsList;
