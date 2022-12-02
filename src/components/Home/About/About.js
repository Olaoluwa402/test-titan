import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import about_border from "../../../asset/images/about_border.png";
import visionBg from "../../../asset/images/vision.png";
import Title from "../Title/Title";

function About() {
  const store = useSelector((store) => store.homeData.data);

  const { about, vision, values, services } = store;

  return (
    <div className={styles.generalContainer}>
      {/* home */}

      {about && about.length > 0 && (
        <div className={styles.container} id="about">
          <Title>{about[0].title}</Title>
          <p className={styles.aboutText}>{about[0].desc}</p>

          <div className="w-full flex justify-center items-center ">
            <div className="w-full h-[400px] md:h-[520px] mx-auto my-12 relative px-0">
              <Image
                src={`/${about[0].image}`}
                alt="aboutus"
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: 10 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* our vision */}

      {vision && vision.length > 0 && (
        <div className={styles.vision}>
          <div className={styles.vision_Inner}>
            <div className="p-4 md:p-6 mb-6 md:mb-0">
              <Image
                src={`/${vision[0].image}`}
                alt="ourvision"
                width={690}
                height={580}
              />
            </div>

            <div className="p-4 md:p-6">
              <div className="max-w-[600px]">
                <h2 className={styles.vision__Title}>{vision[0].title}</h2>
                <hr className="my-4 w-[80px] h-[4px] bg-titaniumOrange border-0 dark:bg-gray-700" />
                <p className={styles.vision__Text}>{vision[0].desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    src={item && item.icon ? `/${item.icon}` : visionBg}
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
          <div className="py-4 md:py-6 ">
            <div className="max-w-[600px]">
              <h2 className={styles.service__Title}>{services[0].title}</h2>
              <hr className="my-4 w-[80px] h-[4px] bg-titaniumOrange border-0 dark:bg-gray-700" />
              <p className={styles.service__Text}>{services[0].desc}</p>
            </div>
          </div>
          <div className="py-4 md:py-6 mb-6 md:mb-0">
            <Image
              src={`/${services[0].image}`}
              alt="ourvision"
              width={690}
              height={580}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
