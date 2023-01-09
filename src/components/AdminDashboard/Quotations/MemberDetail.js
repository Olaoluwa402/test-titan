import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getMemberDetailAction } from "../../../redux/actions/memberActions";
import Loader from "../../../components/Spinner/Spinner";

import Title from "../../Home/Title/Title";

const MemberDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const store = useSelector((store) => store.memberDetail);
  const { loading, member } = store;

  useEffect(() => {
    if ((id && !member) || (member && member.member.id != id)) {
      dispatch(getMemberDetailAction({ id }));
    }
  }, [dispatch, member, id]);

  return (
    <div className="w-full">
      {loading ? (
        <Loader />
      ) : member ? (
        <div className="w-3/4 mx-auto flex flex-col drop-shadow-md bg-white p-4 my-4">
          <Title>Membership Details</Title>
          <p>
            <span className="font-bold">Job Title:</span>{" "}
            {member.member.job_title ? member.member.job_title : ""}
          </p>
          <p>
            <span className="font-bold">First Name:</span>{" "}
            {member.member.firstname ? member.member.firstname : ""}
          </p>
          <p>
            <span className="font-bold">Last Name:</span>{" "}
            {member.member.lastname ? member.member.lastname : ""}
          </p>
          <p>
            <span className="font-bold">Join Date:</span>{" "}
            {member.member.join_date
              ? member.member.join_date.substring(0, 10)
              : ""}
          </p>
          <p>
            <span className="font-bold">Plan:</span>{" "}
            {member.member.clubPlan.title ? member.member.clubPlan.title : ""}
          </p>
          <p>
            <span className="font-bold">Marital Status:</span>{" "}
            {member.member.marital_Status ? member.member.marital_Status : ""}
          </p>
          <p>
            <span className="font-bold">Employment Status:</span>{" "}
            {member.member.employment_status
              ? member.member.employment_status
              : ""}
          </p>
          <p>
            <span className="font-bold">Phone:</span>{" "}
            {member.member.phone ? member.member.phone : ""}
          </p>
          <p>Email: {member.member.email ? member.member.email : ""}</p>
          <p>
            <span className="font-bold">Last Name:</span>{" "}
            {member.member.lastname ? member.member.lastname : ""}
          </p>
          <p>
            <span className="font-bold">Heard From ?:</span>{" "}
            {member.member.heard_about ? member.member.heard_about : ""}
          </p>
          <p>
            <span className="font-bold">Referral:</span>{" "}
            {member.member.refer_friend ? member.member.refer_friend : ""}
          </p>
        </div>
      ) : (
        <h2>No record found</h2>
      )}
    </div>
  );
};

export default MemberDetail;
