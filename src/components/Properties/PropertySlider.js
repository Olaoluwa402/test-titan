import React from "react";

import Image from "next/image";
import Link from "next/link";
import Title from "../Home/Title/Title";
import { MdNavigateNext } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Properties.module.css";

function Properties({ properties }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    <div className="w-full px-6 lg:w-3/4 mx-auto">
      <Title>Our Properties</Title>
      <Slider {...settings}>
        {properties &&
          properties.length > 0 &&
          properties.map((property) => (
            <div
              key={property.id}
              className="max-w-[300px] md:max-w-[340px] mx-auto h-[536px] flex flex-col justify-center items-center border-1 bg-white border-slate-200 drop-shadow-md rounded-lg"
            >
              <Link href={`/properties/[id]`} as={`/properties/${property.id}`}>
                <a>
                  <Image
                    src={`/${property.image}`}
                    alt="property"
                    width={380}
                    height={294}
                    className={styles.cardImage}
                  />
                </a>
              </Link>

              <div className="w-full p-6">
                <Link
                  href={`/properties/[id]`}
                  as={`/properties/${property.id}`}
                >
                  <a>
                    {" "}
                    <h2 className={styles.name}>{property.title}</h2>
                  </a>
                </Link>

                <h2 className={styles.amount}>₦{property.pricing}</h2>
                <p className={styles.cardText}>{property.short_desc}</p>
                <hr />
                <div className={styles.extrainfo}>
                  <span>
                    {property.area}m<sup>2</sup>
                  </span>
                  {" . "}
                  <span>{property.no_of_beds}beds</span> {" . "}
                  <span>{property.no_of_baths}baths</span> {" . "}
                  <span>{property.parking_space}parking space</span>
                </div>
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

export default Properties;
