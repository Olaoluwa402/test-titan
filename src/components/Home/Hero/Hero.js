import React from "react";
import styles from "./Hero.module.css";
import HeroSelecBar from "./HeroSelecBar";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

function Hero() {
  const store = useSelector((store) => store.homeData.data);

  const { sliders, settings } = store;

  return (
    <div className={styles.container}>
      <div className=" w-full">
        <Carousel
          showArrows={true}
          autoPlay={true}
          thumbWidth="0px"
          showThumbs={false}
          infiniteLoop={true}
          interval="5000"
          showStatus={false}
        >
          {sliders &&
            sliders.map((slide, i) => (
              <div key={i}>
                <div
                  className={styles.container}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                  }}
                >
                  <div className={styles.content}>
                    <h1 className={styles.hero_heading}>{slide.title}</h1>
                    <p className={styles.hero_message}>{slide.description}</p>
                    <Link href={slide.url}>
                      <a className={styles.hero__cta}>
                        {settings[0].getQuoteCTA}
                      </a>
                    </Link>
                  </div>
                  <div className={styles.overlay}></div>
                </div>
              </div>
            ))}
        </Carousel>
      </div>

      <div className="hidden lg:block w-full mx-auto absolute bottom-12 left-0 right-0">
        <HeroSelecBar />
      </div>
    </div>
  );
}

export default Hero;
