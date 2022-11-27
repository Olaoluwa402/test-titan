import React from "react";
import styles from "./Properties.module.css";
import Image from "next/image";
import Link from "next/link";
import Title from "../Home/Title/Title";

function Properties({ properties }) {
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
                    src={property.images[0].url}
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

                <div className={styles.extrainfo}>{property.extra_info}</div>
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
