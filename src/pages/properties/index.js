import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Properties from "../../components/Properties/Properties";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAction } from "../../redux/actions/propertiesActions";
import { getHomeDataAction } from "../../redux/actions/generalActions";
import Modal from "../../components/Modals/CustomModal/CustomModal";
import Lottie from "lottie-react";
import congratulation from "../../asset/Lottie/91771-spinning-circles-loading-animation.json";

function PropertiesScreen() {
  const store = useSelector((store) => store.properties);
  const { loading, data } = store;

  const home = useSelector((store) => store.homeData);
  const { loading: loadingHome, data: homeRecord } = home;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropertiesAction());
    dispatch(getHomeDataAction());
  }, [dispatch]);

  return (
    <>
      {loadingHome && (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      )}
      {loading && (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      )}
      {homeRecord && (
        <Layout> {data && <Properties properties={data.properties} />}</Layout>
      )}
    </>
  );
}

export default PropertiesScreen;
