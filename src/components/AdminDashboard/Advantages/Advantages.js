import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../../Modals/CustomModal/CustomModal";
import NewAdvantage from "./NewAdvantage";
import EditAdvantage from "./EditAdvantage";
import {
  deleteAdvantageAction,
  getAdvantagesAction,
} from "../../../redux/actions/advantagesActions";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";
import { DELETE_ADVANTAGE_RESET } from "../../../redux/constants/advantageConstants";

const Advantages = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const store = useSelector((store) => store.advantages);
  const { loading, data } = store;
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteAdvantage
  );

  useEffect(() => {
    dispatch(getAdvantagesAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_ADVANTAGE_RESET });
    }
  }, [dispatch, deleteSuccess]);

  //closeModal
  const closeModalHandler = () => {
    setOpen((prev) => !prev);
    dispatch(getAdvantagesAction());
  };

  //closeEdit modal
  const closeEditModalHandler = () => {
    setOpenEdit((prev) => !prev);
    dispatch(getAdvantagesAction());
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
      dispatch(deleteAdvantageAction({ id: deleteId }));
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
            <NewAdvantage
              setOpen={setOpen}
              closeModalHandler={closeModalHandler}
            />
          }
        </Modal>
      )}
      {openEdit && (
        <Modal>
          {
            <EditAdvantage
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
            New Advantage
          </button>
        </div>

        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Advantges
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
            data.propertyAdvantages &&
            data.propertyAdvantages.length > 0 ? (
            <div className="my-12  overflow-auto">
              <table className="w-full">
                <thead className=" border-b-2 border-t-2 border-gray-200">
                  <tr>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      SN
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Name
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Desription
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Property
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.propertyAdvantages.map((advantage, i) => (
                    <tr
                      key={advantage.id}
                      className="bg-white hover:bg-blue-200"
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {i + 1}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {truncateText(advantage.title, 30)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        {truncateText(advantage.description, 50)}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {advantage.propertyId}
                      </td>

                      <td>
                        <div className="flex justify-center items-center">
                          <MdOutlineEditNote
                            className="mr-3 cursor-pointer"
                            onClick={() => {
                              setUpdateId(advantage.id);
                              setOpenEdit((prev) => !prev);
                            }}
                          />
                          {deleteLoading && deleteId == advantage.id ? (
                            <Spinner />
                          ) : (
                            <BsTrash
                              className="cursor-pointer"
                              onClick={() => confirmDeleteHandler(advantage.id)}
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
            <h2>No Advantage yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Advantages;
