import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InvestmentClub from "../../components/InvestmentClub/InvestmentClub";
import Layout from "../../components/Layout/Layout";
import {
  getClubPlanAction,
  getHomeDataAction,
} from "../../redux/actions/generalActions";
import Modal from "../../components/Modals/CustomModal/CustomModal";
import Lottie from "lottie-react";
import congratulation from "../../asset/Lottie/91771-spinning-circles-loading-animation.json";

const ClubPlan = () => {
  const home = useSelector((store) => store.homeData);
  const { loading: loadingHome, data: homeRecord } = home;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClubPlanAction());
    dispatch(getHomeDataAction());
  }, [dispatch]);
  return (
    <>
      {loadingHome ? (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      ) : homeRecord ? (
        <Layout>
          <InvestmentClub />
        </Layout>
      ) : (
        "Loading"
      )}
    </>
  );
};

export default ClubPlan;

// export const getServerSideProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req, res, query }) => {
//       await store.dispatch(getHomeDataAction());
//       await store.dispatch(getClubPlanAction());
//     }
// );
