import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../../Modals/CustomModal/CustomModal";
import NewFloorPlan from "./NewFloorPlan";
import EditFloorPlan from "./EditFloorPlan";
import {
  getFloorPlansAction,
  deleteFloorPlanAction,
} from "../../../redux/actions/floorPlanActions";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";
import { DELETE_FLOORPLAN_RESET } from "../../../redux/constants/floorPlanConstants";

const FloorPlans = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const store = useSelector((store) => store.floorPlans);
  const { loading, data } = store;
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteFloorPlan
  );

  useEffect(() => {
    dispatch(getFloorPlansAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_FLOORPLAN_RESET });
    }
  }, [dispatch, deleteSuccess]);

  //closeModal
  const closeModalHandler = () => {
    setOpen((prev) => !prev);
    dispatch(getFloorPlansAction());
  };

  //closeEdit modal
  const closeEditModalHandler = () => {
    setOpenEdit((prev) => !prev);
    dispatch(getFloorPlansAction());
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
      dispatch(deleteFloorPlanAction({ id: deleteId }));
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
            <NewFloorPlan
              setOpen={setOpen}
              closeModalHandler={closeModalHandler}
            />
          }
        </Modal>
      )}
      {openEdit && (
        <Modal>
          {
            <EditFloorPlan
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
            New Floor Plan
          </button>
        </div>

        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Floor Plans
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
          ) : data && data.plans && data.plans.length > 0 ? (
            <div className="w-full flex flex-wrap my-12 justify-center items-center">
              {data.plans.map((plan) => (
                <div key={plan.id} className="m-3">
                  <div>
                    {" "}
                    <Image
                      src={`/${plan.image}`}
                      alt="property plan"
                      width={150}
                      height={150}
                    />
                  </div>
                  <p>
                    {plan.title}{" "}
                    <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full bg-black text-white">
                      <span className="text-[12px]">{plan.propertyId}</span>
                    </div>
                  </p>
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
                </div>
              ))}
            </div>
          ) : (
            <h2>No Floor plan yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default FloorPlans;
