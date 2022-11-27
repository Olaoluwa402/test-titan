import React from "react";
import Layout from "../../../components/Layout/Layout";
import SingleProperty from "../../../components/SingleProperty/SingleProperty";
import { wrapper } from "../../../redux/store";
import { useSelector } from "react-redux";
import { getPropertyDetailAction } from "../../../redux/actions/propertiesActions";
import { getHomeDataAction } from "../../../redux/actions/generalActions";
//hello
const SinglePropertyScreen = () => {
  return <SingleProperty />;
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     async ({ req, res, params }) => {
//       await store.dispatch(getHomeDataAction());
//       await store.dispatch(getPropertyDetailAction({ id: params.id }));
//     }
// );

export default SinglePropertyScreen;
