import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Register from "../../components/InvestmentClub/Registration/Register";
import { getHomeDataAction } from "../../redux/actions/generalActions";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modals/CustomModal/CustomModal";

import Lottie from "lottie-react";
import congratulation from "../../asset/Lottie/91771-spinning-circles-loading-animation.json";

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const store = useSelector((store) => store.homeData);
  const { loading, data } = store;

  useEffect(() => {
    dispatch(getHomeDataAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      ) : data ? (
        <Layout>
          <Register />
        </Layout>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default RegisterScreen;
