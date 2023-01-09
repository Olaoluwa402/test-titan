import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import { useRouter } from "next/router";
import Modal from "../../Modals/CustomModal/CustomModal";
import NewPlanBenefit from "./NewPlanBenefit";
import EditPlanBenefit from "./EditPlanBenefit";
import {
  getPlanBenefitsAction,
  deletePlanBenefitAction,
} from "../../../redux/actions/planBenefitActions";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";
import { DELETE_PLANBENEFIT_RESET } from "../../../redux/constants/planBenefitConstants";

const Plans = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const { loading, data } = useSelector((store) => store.allBenefits);

  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteBenefit
  );

  useEffect(() => {
    dispatch(getPlanBenefitsAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_PLANBENEFIT_RESET });
    }
  }, [dispatch, deleteSuccess]);

  //closeModal
  const closeModalHandler = () => {
    setOpen((prev) => !prev);
    dispatch(getPlanBenefitsAction());
  };

  //closeEdit modal
  const closeEditModalHandler = () => {
    setOpenEdit((prev) => !prev);
    dispatch(getPlanBenefitsAction());
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
      dispatch(deletePlanBenefitAction({ id: deleteId }));
    }
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
            <NewPlanBenefit
              setOpen={setOpen}
              closeModalHandler={closeModalHandler}
            />
          }
        </Modal>
      )}
      {openEdit && (
        <Modal>
          {
            <EditPlanBenefit
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
            New Benefit
          </button>
        </div>

        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Benefits
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
          ) : data &&
            data.clubPlanBenefits &&
            data.clubPlanBenefits.length > 0 ? (
            <div className="my-12  overflow-auto">
              <table className="w-full">
                <thead className=" border-b-2 border-t-2 border-gray-200">
                  <tr>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      SN
                    </th>

                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Benefit
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      PlanID
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
                  {data.clubPlanBenefits.map((benefit, i) => (
                    <tr key={benefit.id} className="bg-white hover:bg-blue-200">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {i + 1}
                        </div>
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        <span className="capitalize">{benefit.benefit}</span>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        <span className="capitalize">{benefit.clubPlanId}</span>
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {benefit.createdAt.substring(0, 10)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {benefit.updatedAt.substring(0, 10)}
                      </td>

                      <td>
                        <div className="flex justify-center items-center">
                          <MdOutlineEditNote
                            className="mr-3 cursor-pointer"
                            onClick={() => {
                              setUpdateId(benefit.id);
                              setOpenEdit((prev) => !prev);
                            }}
                          />
                          {deleteLoading && deleteId == benefit.id ? (
                            <Spinner />
                          ) : (
                            <BsTrash
                              className="cursor-pointer"
                              onClick={() => confirmDeleteHandler(benefit.id)}
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
