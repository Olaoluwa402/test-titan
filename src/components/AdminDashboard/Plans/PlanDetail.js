import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getClubPlanDetailAction } from "../../../redux/actions/clubPlanActions";
import Loader from "../../Spinner/Spinner";

import Title from "../../Home/Title/Title";

const PlanDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { loading, clubplan } = useSelector((store) => store.clubPlanDetail);

  useEffect(() => {
    if ((id && !clubplan) || (clubplan && clubplan.clubPlan.id != id)) {
      dispatch(getClubPlanDetailAction({ id }));
    }
  }, [dispatch, clubplan, id]);

  return (
    <div className="w-full">
      {loading ? (
        <Loader />
      ) : clubplan ? (
        <div className="w-3/4 mx-auto flex flex-col drop-shadow-md bg-white p-4 my-4">
          <Title>Plan Details</Title>
          <p>
            <span className="font-bold">Plan Name:</span>{" "}
            {clubplan.clubPlan.title ? clubplan.clubPlan.title : ""}
          </p>
          <p>
            <span className="font-bold">Price:</span>{" "}
            {clubplan.clubPlan.price ? clubplan.clubPlan.price : ""}
          </p>
          <p>
            <span className="font-bold">Short Description:</span>{" "}
            {clubplan.clubPlan.short_desc ? clubplan.clubPlan.short_desc : ""}
          </p>
          <p>
            <span className="font-bold">Long Description:</span>{" "}
            {clubplan.clubPlan.long_desc ? clubplan.clubPlan.long_desc : ""}
          </p>
        </div>
      ) : (
        <h2>No record found</h2>
      )}
    </div>
  );
};

export default PlanDetail;
