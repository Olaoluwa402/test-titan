import { useEffect } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import Modal from "../../components/Modals/CustomModal/CustomModal";
import Lottie from "lottie-react";
import congratulation from "../../asset/Lottie/91771-spinning-circles-loading-animation.json";
import { useRouter } from "next/router";
import { getPropertyDetailAction } from "../../redux/actions/propertiesActions";
import { getHomeDataAction } from "../../redux/actions/generalActions";
import styles from "./SingleProperty.module.css";
import Title from "../Home/Title/Title";
import floorBg from "../../asset/images/floorplan-bg.png";

const style = {
  width: "100%",
  height: "300px",
  color: "#f3f3f3",
  backgroundImage: `url(${floorBg.src})`,
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundOrigin: "right bottom",
};
const SingleProperty = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const store = useSelector((store) => store.propertyDetail);
  const { loading, property } = store;

  if (property) {
    console.log(property);
  }

  const home = useSelector((store) => store.homeData);
  const { loading: loadingHome, data: homeRecord } = home;

  useEffect(() => {
    dispatch(getHomeDataAction());
    dispatch(getPropertyDetailAction({ id }));
  }, [dispatch, id]);
  return (
    <>
      {loadingHome ? (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      ) : property ? (
        <Layout>
          <div className="w-full  h-full">
            {/* video banner */}
            <div className="w-full  h-screen bg-slate-300">
              <div className="w-full md:w-4/5 mx-auto h-screen bg-slate-600 relative">
                <div className="bg-dark opacity-50 absolute top-0 left-0 bottom-0 right-0 z-2"></div>
                <p className="absolute z-10 top-0 left-0 text-white uppercase text-[20px] font-bold m-6 font-Jakarta">
                  {property && property.property.title}
                </p>
                <video
                  className={styles.video}
                  width="100%"
                  height="450"
                  controls
                >
                  <source
                    src={property && property.property.video_url}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* end of banner */}

            {/* property images */}
            <div className="w-full md:w-4/5 mx-auto my-6 p-5 md:p-0">
              <h2 className="text-dark text-[30px] md:text-[45px] font-Jakarta font-bold">
                {property && property.property.title}
              </h2>
              <p className="text-[16px] my-3">
                {property && property.property.description}
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center my-3">
                {property &&
                  property.property.images &&
                  property.property.images.length > 0 &&
                  property.property.images.map((image) => (
                    <div key={image.id} className="basis-2/6 mr-3 py-3">
                      <Image
                        src={image.url}
                        alt="single property"
                        width={385}
                        height={258}
                      />{" "}
                    </div>
                  ))}
              </div>
            </div>
            {/* end of images */}

            {/* facilities */}
            <div className="w-full md:w-4/5 mx-auto">
              <Title>House Facilities</Title>

              <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                {property &&
                  property.property.facilities &&
                  property.property.facilities.length > 0 &&
                  property.property.facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="w-[290px] h-[150px] flex flex-col md:flex-row  items-center justify-center  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                    >
                      <div className="sm:w-[64px] mr-3">
                        <div className=" flex items-center justify-center w-[64px] h-[64px] mr-3 rounded-full  bg-titaniumOrange200">
                          <Image
                            src={facility.icon}
                            alt="facility"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>

                      <div className="basis-full sm:basis-full flex justify-center sm:justify-start items-center">
                        {" "}
                        <p className="">{facility.title}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* end of faclities */}

            {/* property plan pricing */}
            <div className="w-full h-full md:w-4/5 mx-auto my-12">
              <h2 className="font-Jakarta text-[25px] max-w-[650px] mx-auto  md:text-[30px] text-dark text-center font-bold my-6 px-6">
                {property && property.property.title} Floor Plan & Pricing
              </h2>

              <div className="w-full h-full flex flex-col lg:flex-row my-12 ">
                <div className="basis-3/5 max-h-[520px]">
                  <div className="w-full flex items-center p-3 flex-wrap  border-b-3 border-b-light200">
                    <div className="w-[180px] h-[47px] bg-light mr-0 mb-3 md:mr-6 py-2 px-3 cursor-pointer hover:bg-titaniumOrange border-b-4 border-b-titaniumOrange">
                      First Floor Plan
                    </div>
                    <div className="w-[180px] h-[47px] bg-light100 mr-0 mb-3 md:mr-6 py-2 px-3 cursor-pointer hover:bg-titaniumOrange">
                      Second Floor Plan
                    </div>
                    <div className="w-[180px] h-[47px] bg-light100 mr-0 mb-3 md:mr-6 py-2 px-3 cursor-pointer hover:bg-titaniumOrange">
                      Ground Floor Plan
                    </div>
                  </div>

                  <div className="" sty={{ width: "100%", height: "100%" }}>
                    <Image
                      src={property && property.property.propertyPlans[0].image}
                      alt="floorplan"
                      width={400}
                      height={400}
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className=" basis-2/5 min-h-[520px] bg-slate-100">
                  <div className="p-12 h-[480px] flex flex-col justify-between">
                    <div>
                      <h3 className="text-dark200">
                        {property && property.property.location}
                      </h3>
                      <p className="text-dark text-[40px] font-Jakarta font-bold">
                        {property && property.property.pricing}
                      </p>
                      <p className="font-Jakarta" style={{ color: "#9FA4AE" }}>
                        Outright Purchase
                      </p>
                    </div>

                    <div className="w-[300px] h-[200px] self-end">
                      <Image
                        src={floorBg}
                        alt="floor"
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* End of property plan */}
          </div>
        </Layout>
      ) : (
        <Modal>
          <h2>No Record Yet</h2>
        </Modal>
      )}
    </>
  );
};

export default SingleProperty;