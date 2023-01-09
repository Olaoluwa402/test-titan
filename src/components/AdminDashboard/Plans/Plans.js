import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/router";
import Modal from "../../Modals/CustomModal/CustomModal";
import NewMember from "./NewPlan";
import EditMember from "./EditPlan";
import {
  getclubPlansAction,
  deleteClubPlanAction,
} from "../../../redux/actions/clubPlanActions";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";
import { DELETE_CLUBPLAN_RESET } from "../../../redux/constants/clubPlanConstants";

const Plans = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const store = useSelector((store) => store.allClubPlans);
  const { loading, data } = store;
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteClubPlan
  );

  useEffect(() => {
    dispatch(getclubPlansAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_CLUBPLAN_RESET });
    }
  }, [dispatch, deleteSuccess]);

  //closeModal
  const closeModalHandler = () => {
    setOpen((prev) => !prev);
    dispatch(getclubPlansAction());
  };

  //closeEdit modal
  const closeEditModalHandler = () => {
    setOpenEdit((prev) => !prev);
    dispatch(getclubPlansAction());
  };

  //confirm and delete function logics
  const confirmDeleteHandler = (id) => {
    setShowDeleteModal((prev) => !prev);
    setDeletedId(id);
  };

  const cancelModalHandler = () => {
    setShowDeleteModal((prev) => !prev);
  };
  const nextModalHandler = (status) => {
    setShowDeleteModal((prev) => !prev);
    if (deleteId && status === "ok") {
      dispatch(deleteClubPlanAction({ id: deleteId }));
    }
  };

  const benefitsHandler = () => {
    router.push("/admin/plan_benefits");
  };

  const truncateText = (str, num) => {
    if (str.length > num) {
      return str.substring(0, num) + "...";
    } else {
      return str.substring(0, num);
    }
  };

  return (
    <>
      {/* new user modal */}
      {open && (
        <Modal>
          {
            <NewMember
              setOpen={setOpen}
              closeModalHandler={closeModalHandler}
            />
          }
        </Modal>
      )}
      {openEdit && (
        <Modal>
          {
            <EditMember
              setOpen={setOpenEdit}
              id={updateId}
              closeEditModalHandler={closeEditModalHandler}
            />
          }
        </Modal>
      )}
      {/* confirm delete modal */}
      {showDeleteModal && (
        <Modal>
          <Confirm
            text="Are you sure you want to delete this?"
            closeHandler={cancelModalHandler}
            nextHandler={nextModalHandler}
          />
        </Modal>
      )}
      <div className="w-full 2xl:w-4/5 mx-auto">
        <div className="flex items-center justify-between my-3 bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            New Plan
          </button>

          <button
            onClick={benefitsHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Benefits
          </button>
        </div>

        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Plans
            </p>
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center p-3">
              <div className="flex justify-between items-center  p-1 mb-2 md:mb-0 mr-2 cursor-pointer">
                <FaSearch className="mr-2" />
                <input type="text" placeholder="Search" className="outline-0" />
              </div>

              <div className="flex justify-between items-center border border-peppermartDark50 p-1 mb-2 md:mb-0 mr-2 cursor-pointer">
                <BsFilterSquare className="mr-2" />
                <p>Filter</p>
              </div>
              <div className="flex justify-between items-center border border-peppermartDark50 p-1 mb-2 md:mb-0 mr-2 cursor-pointer">
                <FaPaperPlane className="mr-2" />
                <p>Export</p>
              </div>
              <div className="flex justify-between items-center border border-peppermartDark50 p-1 mb-2 md:mb-0 mr-2 cursor-pointer">
                <BsChevronDown className="mr-2" />
                <p>Bulk Action</p>
              </div>
            </div>
          </div>

          {/* table */}
          {loading ? (
            <Spinner />
          ) : data && data.clubPlans && data.clubPlans.length > 0 ? (
            <div className="my-12  overflow-auto">
              <table className="w-full">
                <thead className=" border-b-2 border-t-2 border-gray-200">
                  <tr>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      SN
                    </th>

                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Plan
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Price
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Created Date
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Updated Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.clubPlans.map((plan, i) => (
                    <tr key={plan.id} className="bg-white hover:bg-blue-200">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {i + 1}
                        </div>
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        <Link
                          href={`/admin/plans/[id]`}
                          as={`/admin/plans/${plan.id}`}
                        >
                          <a className="capitalize">{plan.title}</a>
                        </Link>
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {plan.price}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {plan.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {plan.updatedAt.substring(0, 10)}
                      </td>

                      <td>
                        <div className="flex justify-center items-center">
                          <MdOutlineEditNote
                            className="mr-3 cursor-pointer"
                            onClick={() => {
                              setUpdateId(plan.id);
                              setOpenEdit((prev) => !prev);
                            }}
                          />
                          {deleteLoading && deleteId == plan.id ? (
                            <Spinner />
                          ) : (
                            <BsTrash
                              className="cursor-pointer"
                              onClick={() => confirmDeleteHandler(plan.id)}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>No Plan yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Plans;
