import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import about_border from "../../../asset/images/about_border.png";
import vision from "../../../asset/images/vision.png";
import Title from "../Title/Title";

function About() {
  const store = useSelector((store) => store.homeData.data);

  const { settings, values, services } = store;

  return (
    <div className={styles.generalContainer}>
      {/* home */}
      <div className={styles.container} id="about">
        <Title>{settings[0].aboutUsTitle}</Title>
        <p className={styles.aboutText}>{settings[0].aboutUsText}</p>

        <div className="w-full flex justify-center items-center">
          <div className="w-full h-[400px] md:h-[520px] mx-auto my-12 relative">
            <Image
              src={settings[0].aboutUsImage}
              alt="aboutus"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: 10 }}
            />
          </div>
        </div>
      </div>

      {/* our vision */}
      <div className={styles.vision}>
        <div className={styles.vision_Inner}>
          <div className="p-4 md:p-6 mb-6 md:mb-0">
            <Image
              src={settings[0].ourVisionImage}
              alt="ourvision"
              width={547}
              height={417}
            />
          </div>

          <div className="p-4 md:p-6">
            <div className="max-w-[550px]">
              <h2 className={styles.vision__Title}>
                {settings[0].ourVisionTitle}
              </h2>
              <hr className="my-4 w-[80px] h-[4px] bg-titaniumOrange border-0 dark:bg-gray-700" />
              <p className={styles.vision__Text}>{settings[0].ourVisionText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* our values */}
      <div className={styles.valuesContainer}>
        <div className={styles.valueTop}>
          <Title>{values[0].title}</Title>

          <p className={styles.visionText}>{values[0].desc}</p>
        </div>
        <div className={styles.cardContainer}>
          {values[0].ValueMenu &&
            values[0].ValueMenu.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.vectorContainer}>
                  <Image
                    src={item && item.icon ? item.icon : vision}
                    alt="ourvision"
                    width={34.76}
                    height={33.09}
                  />
                </div>
                <p className={styles.cardTitle}>{item.title}</p>
                <p className={styles.cardText}>{item.desc}</p>
              </div>
            ))}
        </div>
      </div>

      {/* our servces */}
      <div className={styles.service} id="services">
        <div className={styles.service_Inner}>
          <div className="p-4 md:p-6">
            <div className="max-w-[550px]">
              <h2 className={styles.service__Title}>{services[0].title}</h2>
              <hr className="my-4 w-[80px] h-[4px] bg-titaniumOrange border-0 dark:bg-gray-700" />
              <p className={styles.service__Text}>{services[0].desc}</p>
            </div>
          </div>
          <div className="p-4 md:p-6 mb-6 md:mb-0">
            <Image
              src={services[0].image}
              alt="ourvision"
              width={547}
              height={417}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
