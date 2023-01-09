import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modals/CustomModal/CustomModal";
import Lottie from "lottie-react";
import congratulation from "../../../asset/Lottie/91771-spinning-circles-loading-animation.json";
import { useRouter } from "next/router";
import { getPropertyDetailAction } from "../../../redux/actions/propertiesActions";

import Title from "../../Home/Title/Title";
import floorBg from "../../../asset/images/naira.png";
import PropertyImages from "../../SingleProperty/PropertyImages";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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

  useEffect(() => {
    dispatch(getPropertyDetailAction({ id }));
  }, [dispatch, id]);

  const typicalFloor =
    property &&
    property.property.facilities &&
    property.property.facilities.length > 0 &&
    property.property.facilities.filter((item) => item.onTypicalFloor == true);

  const maissonete =
    property &&
    property.property.facilities &&
    property.property.facilities.length > 0 &&
    property.property.facilities.filter((item) => item.onMaissonete == true);
  const normalFloor =
    property &&
    property.property.facilities &&
    property.property.facilities.length > 0 &&
    property.property.facilities.filter(
      (item) => item.onMaissonete !== true && item.onTypicalFloor !== true
    );

  return (
    <>
      {loading ? (
        <Modal>
          <Lottie animationData={congratulation} loop={true} />
        </Modal>
      ) : property ? (
        <div className="w-full  h-full">
          {/* video banner */}
          <div className="w-full  h-screen bg-inherit">
            <div className="w-full md:w-4/5 mx-auto h-screen bg-slate-600 relative">
              <div className="bg-dark opacity-50 absolute top-0 left-0 bottom-0 right-0 z-2"></div>
              <p className="absolute z-10 top-0 left-0 text-white uppercase text-[20px] font-bold m-6 font-Jakarta">
                {property && property.property.sub_title}
              </p>
              {property && property.property.video_url ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${property.property.video_url}?controls=1&autoplay=1&mute=1`}
                ></iframe>
              ) : (
                <div className="w-full h-full">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={property && property.property.title}
                    src={
                      property && property.property.image
                        ? `/${property.property.image}`
                        : ""
                    }
                  />
                </div>
              )}
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
              <PropertyImages property={property} />
            </div>
          </div>
          {/* end of images */}

          {/* facilities*/}
          {normalFloor && normalFloor.length > 0 && (
            <div className="w-full md:w-4/5 mx-auto">
              <Title>House Facilities </Title>

              <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                {normalFloor.map((facility) => (
                  <div
                    key={facility.id}
                    className="w-[290px] h-[150px] flex flex-col md:flex-row  items-center justify-center  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                  >
                    {" "}
                    <div className="sm:w-[64px] mr-3">
                      <div className=" flex items-center justify-center w-[50px] h-[50px] mr-3 rounded-full  bg-titaniumOrange200">
                        <Image
                          src={`/${facility.icon}`}
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
          )}

          {/* facilities on Maissonete*/}
          {maissonete && maissonete.length > 0 && (
            <div className="w-full md:w-4/5 mx-auto">
              <Title>House Facilities on Maissonete</Title>

              <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                {maissonete.map((facility) => (
                  <div
                    key={facility.id}
                    className="w-[290px] h-[150px] flex flex-col md:flex-row  items-center justify-center  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                  >
                    {" "}
                    <div className="sm:w-[64px] mr-3">
                      <div className=" flex items-center justify-center w-[50px] h-[50px] mr-3 rounded-full  bg-titaniumOrange200">
                        <Image
                          src={`/${facility.icon}`}
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
          )}

          {/* end of faclities */}

          {/* facilities on Typical Floor */}
          {typicalFloor && typicalFloor.length > 0 && (
            <div className="w-full md:w-4/5 mx-auto">
              <Title>House Facilities on Typical Floor</Title>

              <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                {typicalFloor.map((facility) => (
                  <div
                    key={facility.id}
                    className="w-[290px] h-[150px] flex flex-col md:flex-row  items-center justify-center  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                  >
                    {" "}
                    <div className="sm:w-[64px] mr-3">
                      <div className=" flex items-center justify-center w-[50px] h-[50px] mr-3 rounded-full  bg-titaniumOrange200">
                        <Image
                          src={`/${facility.icon}`}
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
          )}

          {/* property features */}
          {property &&
            property.property.propertyFeatures &&
            property.property.propertyFeatures.length > 0 && (
              <div className="w-full md:w-4/5 mx-auto">
                <Title>House Features</Title>

                <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                  {property.property.propertyFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="w-[290px] h-[200px] flex flex-col  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                    >
                      {" "}
                      <div className="sm:w-[64px] mr-3">
                        <div className=" flex items-center justify-center w-[50px] h-[50px] mr-3 rounded-full  bg-titaniumOrange200">
                          <Image
                            src={`/${feature.icon}`}
                            alt="feature"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className="basis-full sm:basis-full flex  items-center">
                        {" "}
                        <p className="">{feature.title}</p>
                      </div>
                      <div className="basis-full sm:basis-full flex  items-center">
                        {" "}
                        <p className="text-dark50 text-[14px]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* property features */}
          {property &&
            property.property.propertyAdvantages &&
            property.property.propertyAdvantages.length > 0 && (
              <div className="w-full md:w-4/5 mx-auto">
                <Title>Property Added Advatages</Title>

                <div className="flex flex-col md:flex-row items-center  flex-wrap my-3">
                  {property.property.propertyAdvantages.map((feature) => (
                    <div
                      key={feature.id}
                      className="w-[290px] h-[150px] flex flex-col   items-center justify-center  bg-slate-50 drop-shadow-md my-3 mr-3 rounded-lg p-3"
                    >
                      {" "}
                      <div className="sm:w-[64px] mr-3">
                        <div className=" flex items-center justify-center w-[50px] h-[50px] mr-3 rounded-full  bg-titaniumOrange200">
                          <Image
                            src={`/${feature.icon}`}
                            alt="feature"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>
                      <div className="basis-full sm:basis-full flex justify-center sm:justify-start items-center">
                        {" "}
                        <p className="">{feature.title.toUpperCase()}</p>
                      </div>
                      <div className="basis-full sm:basis-full flex flex-col justify-center sm:justify-start items-center">
                        {" "}
                        <p className="">{feature.description}</p>
                        <hr className="my-0 w-[80px] h-[2px] bg-titaniumOrange border-0 dark:bg-gray-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* end of faclities */}

          {/* property plan pricing */}
          <div className="w-full h-full md:w-4/5 mx-auto my-12">
            <h2 className="font-Jakarta text-[25px] max-w-[980px] mx-auto  md:text-[30px] text-dark text-center font-bold my-6 px-6">
              {property && property.property.sub_title} Floor Plan & Pricing
            </h2>

            <div className="w-full h-full flex flex-col lg:flex-row my-12 ">
              <div className="basis-3/5 max-h-[520px] mr-12">
                <Tabs>
                  <TabList className="border-b-2 border-b-slate-300">
                    {property &&
                      property.property.propertyPlans &&
                      property.property.propertyPlans.length > 0 &&
                      property.property.propertyPlans.map((item, i) => (
                        <Tab key={item.id}>{item.title}</Tab>
                      ))}
                  </TabList>
                  {property &&
                    property.property.propertyPlans &&
                    property.property.propertyPlans.length > 0 &&
                    property.property.propertyPlans.map((item, i) => (
                      <TabPanel key={item.id}>
                        <div
                          className=""
                          sty={{ width: "100%", height: "100%" }}
                        >
                          <Image
                            src={`/${item.image}`}
                            alt="floorplan"
                            width={600}
                            height={400}
                            objectFit="contain"
                          />
                        </div>
                      </TabPanel>
                    ))}
                </Tabs>
              </div>
              <div className=" basis-2/5 min-h-[520px] bg-slate-100">
                <div className="p-12 h-[480px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-dark200">
                      {property && property.property.location}
                    </h3>
                    <p className="text-dark text-[40px] font-Jakarta font-bold">
                      ₦{property && property.property.pricing}
                    </p>
                    <p className="font-Jakarta" style={{ color: "#9FA4AE" }}>
                      Outright Purchase
                    </p>
                  </div>

                  <div className="w-[300px] h-[200px] self-end">
                    <Image src={floorBg} alt="floor" width={300} height={300} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* End of property plan */}
        </div>
      ) : (
        <Modal>
          <h2>No Record Yet</h2>
        </Modal>
      )}
    </>
  );
};

export default SingleProperty;
