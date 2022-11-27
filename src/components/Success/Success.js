import React from "react";
import Button from "../Button/Button";
import Lottie from "lottie-react";
import congratulation from "../../asset/Lottie/66443-congratulations-icon.json";

const Success = ({ title, text, setModalOpen }) => {
  return (
    <div className="w-3/4 mx-auto flex flex-col justify-center items-center bg-white drop-shadow-md rounded-xl px-12 py-6 m-3">
      <div className="max-w-[450px] text-center flex flex-col justify-center items-center">
        <Lottie animationData={congratulation} loop={true} />
        <h2 className="text-[30px] text-bold">{title}</h2>
        <p className="my-12">{text}</p>
        <Button
          text="Ok"
          color="var(--light)"
          bgColor="var(--titaniumOrange)"
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default Success;
