import React from "react";
import AllOrdersCard from "../../DashBoardLayout/AllOrdersCard";
import AllProductsCard from "../../DashBoardLayout/AllProductsCard";
import Cards from "../../DashBoardLayout/Cards";
import MarketingCard from "../../DashBoardLayout/MarketingCard";
import MarketingGraph from "../../DashBoardLayout/MarketingGraph";
import RecentOrders from "../../DashBoardLayout/RecentOrders";
import SummaryCart from "../../DashBoardLayout/SummaryCart";
import styles from "./Default.module.css";
import { FiUsers } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

const Default = () => {
  return (
    <div className="border-black ">
      <div className=" grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <div className="col-span-3 h-auto grid grid-cols-2 gap-4">
          <div className="col-span-2 grid grid-cols-2 gap-4 ">
            <div className="col-span-1 ">
              <Cards
                icon1={<FiUsers />}
                icon2={<FaChevronDown />}
                week="This week"
                title="Sales"
                amount="4,000,000.00"
                Volume="Volume"
                price="450"
                percentage="+20%"
              />
            </div>
            <div className="col-span-1">
              <Cards
                icon1={<FiUsers />}
                icon2={<FaChevronDown />}
                week="This week"
                title="Customers"
                amount="1,250"
                Volume="Active"
                price="1,180"
                percentage="+20%"
                percent="+15.80%"
              />
            </div>
          </div>
          <div className="col-span-2  grid grid-cols-2 gap-4 md:gap-0 md:w-max-full md:border-2 ">
            <div className="col-auto flex sm:flex  md:gap-14 lg:gap-4  md:w-max-full md:border-2">
              <div className="w-full ">
                <MarketingGraph />
              </div>
              <div className=" ">
                <div className="mb-2">
                  <Cards
                    icon1={<FiUsers />}
                    icon2={<FaChevronDown />}
                    week="This week"
                    title="All Products"
                    amount="45"
                    Volume="Active"
                    price="32"
                    percentage="+24%"
                    percent=""
                    backgroundColor="#1F2B5B"
                  />
                </div>
                <div className="col-span-1">
                  <Cards
                    icon1={<FiUsers />}
                    icon2={<FaChevronDown />}
                    week="This week"
                    title="Abandoned Cart"
                    amount="20%"
                    Volume="Customers"
                    price="30"
                    percentage="+20%"
                    percent="+0.00%"
                    padding=""
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 w-full">
              <SummaryCart />
            </div>
          </div>
        </div>
        <div className="col-span-2 border-2  flex flex-col  w-full md:justify-items-center md:items-center">
          <div className="h-32 w-96 ">
          <AllOrdersCard/>
          </div>
          <div className="mt-4  w-96">
          <RecentOrders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
