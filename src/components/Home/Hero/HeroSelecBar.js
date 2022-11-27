import React from "react";
import { useSelector } from "react-redux";
import styles from "./HeroSelectBar.module.css";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";
import border_rigth from "../../../asset/images/border_rigth.png";

function HeroSelecBar() {
  const store = useSelector((store) => store.homeData.data);

  const { settings, properties } = store;

  const selectProperties = properties.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  const selectPriceRange = properties.map((item) => (
    <option key={item.id} value={item.id}>
      {item.pricing}
    </option>
  ));

  const selectBedroomAmount = properties.map((item) => (
    <option key={item.id} value={item.id}>
      {item.no_of_beds}
    </option>
  ));

  const selectLocation = properties.map((item) => (
    <option key={item.id} value={item.id}>
      {item.location}
    </option>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.locationWrapper}>
        {/* <p className={styles.label}></p> */}
        <select>
          <option value="">{settings[0].selectLocationPlaceholder}</option>
          {selectLocation}
        </select>
      </div>
      <Image src={border_rigth} alt="border" width={2} height={80} />
      <div className={styles.bedroomWrapper}>
        <select>
          <option>{settings[0].selectBedroomAmountPlaceholder}</option>
          {selectBedroomAmount}
        </select>
      </div>
      <Image src={border_rigth} alt="border" width={2} height={80} />
      <div className={styles.priceWrapper}>
        <select>
          <option>{settings[0].selectPriceRangePlaceholder}</option>
          {selectPriceRange}
        </select>
      </div>
      <Image src={border_rigth} alt="border" width={2} height={80} />
      <div className={styles.propertyWrapper}>
        <select>
          <option value="">{settings[0].selectPropertyPlaceholder}</option>
          {selectProperties}
        </select>
      </div>
      <div className={styles.searchContainer}>
        <CiSearch className={styles.searchIcon} />
        <span className={styles.searchText}>SEARCH</span>
      </div>
    </div>
  );
}

export default HeroSelecBar;
