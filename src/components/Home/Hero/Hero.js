import React from "react";
import styles from "./Hero.module.css";
import HeroSelecBar from "./HeroSelecBar";
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";

function Hero() {
  const store = useSelector((store) => store.homeData.data);
  const { sliders, settings } = store;
  const dispatch = useDispatch();

  //open the get quote form modal
  const openQuoteHandler = () => {
    dispatch({
      type: "OPEN",
    });
  };

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
                    backgroundImage: `url(/${slide.image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "100%",
                  }}
                >
                  <div className={styles.content}>
                    <h1 className={styles.hero_heading}>{slide.title}</h1>
                    <p className={styles.hero_message}>{slide.description}</p>

                    <div
                      onClick={openQuoteHandler}
                      className={styles.hero__cta}
                    >
                      {settings[0].getQuoteCTA}
                    </div>
                  </div>
                  <div className={styles.overlay}></div>
                </div>
              </div>
            ))}
        </Carousel>
      </div>

      <div className="hidden xl:block w-4/5 mx-auto absolute bottom-12 left-0 right-0">
        <HeroSelecBar />
      </div>
    </div>
  );
}

export default Hero;
