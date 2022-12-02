import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PropertyImages({ property }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // vertical: false,
    nextArrow: <NextSlideIcon />,
    // prevArrow: <PrevSlideIcon />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      // {
      //   breakpoint: ,
      //   settings: {
      //     slidesToShow: 3,
      //     slidesToScroll: 3,
      //   },
      // },
    ],
  };
  return (
    <div className="w-full px-6 md:px-0 mx-auto">
      <Slider {...settings}>
        {property &&
          property.property.images &&
          property.property.images.length > 0 &&
          property.property.images.map((image) => (
            <div
              key={image.id}
              className="max-w-[385px] mx-auto h-[200px] flex items-center border-1 bg-white border-slate-200 overflow-hidden rounded-lg"
            >
              <div key={image.id} className="basis-2/6 mr-3 py-3">
                <Image
                  src={`/${image.url}`}
                  alt="single property"
                  width={360}
                  height={200}
                />{" "}
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

function NextSlideIcon(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{
        display: "block",
        position: "absolute",
        right: "30px",
        top: "40%",
      }}
      onClick={onClick}
    >
      <div className=" w-[80px] h-[80px]  flex justify-start items-start relative">
        <div className="w-[80px] h-[80px] flex justify-center items-center text-center bg-titaniumOrange200  rounded-full">
          <MdNavigateNext size="30px" style={{ color: "#FF7A00" }} />
        </div>
      </div>
    </div>
  );
}

export default PropertyImages;
