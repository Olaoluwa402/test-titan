import Head from "next/head";
// import { UseEffect } from "react";
import Layout from "../components/Layout/Layout";
import Hero from "../components/Home/Hero/Hero";
import About from "../components/Home/About/About";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { getHomeDataAction } from "../redux/actions/generalActions";
import Properties from "../components/Properties/Properties";
import Team from "../components/Home/Team/Team";
import { useEffect } from "react";
import Modal from "../components/Modals/CustomModal/CustomModal";
import Spinner from "../components/Spinner/Spinner";
import Lottie from "lottie-react";
import congratulation from "../asset/Lottie/91771-spinning-circles-loading-animation.json";
// import Success from "../components/Success/Success";
const Home = () => {
  const store = useSelector((store) => store.homeData);
  const { loading, data } = store;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeDataAction());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      ) : data && data.settings.length > 0 ? (
        <Layout>
          <Head>
            <title>Titanium</title>
            <meta name="description" content="titanium" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Hero />
          <About />
          <Properties properties={data.properties} />
          <Team teams={data.teams} />
        </Layout>
      ) : (
        <div className="min-w-screen min-h-screen bg-dark flex justify-center items-center">
          <h2 className="text-white">No Record Yet...</h2>
        </div>
      )}
    </>
  );
};

// export const getServerSideProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req, res, query }) => {
//       await store.dispatch(getHomeDataAction());
//     }
// );

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req, res, query }) => {
//       await store.dispatch(getHomeDataAction());
//     }
// );

// export const getStaticProps = wrapper.getStaticProps(
//   (store) =>
//     async ({ req, res, query }) => {
//       await store.dispatch(getHomeDataAction());
//     }
// );

// export async function getStaticProps() {
//   // Call an external API endpoint to get home.
//   // You can use any data fetching library
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "Application/json",
//       },
//       credentials: "include",
//       mode: "cors",
//     };
//     const { data } = await axios(
//       "http://localhost:3000/api/properties",
//       config
//     );
//     console.log(data, "posts");
//   } catch (err) {
//     console.log(err);
//   }

//   return {
//     props: {},
//   };
// }

export default Home;
