import React from "react";
import styles from "./Properties.module.css";
import Image from "next/image";
import Link from "next/link";
import Title from "../Home/Title/Title";

function Properties({ properties }) {
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    vertical: false,
  };
  return (
    <div className={styles.container}>
      <Title>Our Properties</Title>
      <div className={styles.cardContainer}>
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <div key={property.id} className={styles.card}>
              <Link href={`/properties/[id]`} as={`/properties/${property.id}`}>
                <a>
                  <Image
                    src={`/${property.image}`}
                    alt="property"
                    width={370}
                    height={294}
                    className={styles.cardImage}
                  />
                </a>
              </Link>

              <div className={styles.infoContainer}>
                <Link
                  href={`/properties/[id]`}
                  as={`/properties/${property.id}`}
                >
                  <a>
                    {" "}
                    <h2 className={styles.name}>{property.title}</h2>
                  </a>
                </Link>

                <h2 className={styles.amount}>{property.pricing}</h2>
                <p className={styles.cardText}>{property.location}</p>
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
          ))
        ) : (
          <h2>No Property Yet</h2>
        )}
      </div>
    </div>
  );
}

export default Properties;
