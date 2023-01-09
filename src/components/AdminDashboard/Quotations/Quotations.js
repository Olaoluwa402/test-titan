import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../Modals/CustomModal/CustomModal";
import { getDate } from "../../utils/getDateTime";

import {
  getQuotesAction,
  deleteQuoteAction,
} from "../../../redux/actions/QuoteActions";
import { DELETE_QUOTE_RESET } from "../../../redux/constants/QuoteConstants";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";

const Quotations = () => {
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");

  const { loading, data } = useSelector((store) => store.allQuotes);
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteQuote
  );

  useEffect(() => {
    dispatch(getQuotesAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_QUOTE_RESET });
    }
  }, [dispatch, deleteSuccess]);

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
      dispatch(deleteQuoteAction({ id: deleteId }));
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
        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Quotes
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
          ) : data && data.quotations && data.quotations.length > 0 ? (
            <div className="my-12  overflow-auto">
              <table className="w-full">
                <thead className=" border-b-2 border-t-2 border-gray-200">
                  <tr>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      SN
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Date
                    </th>

                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Title
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Name
                    </th>

                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Email
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.quotations
                    .slice()
                    .sort((a, b) => b.id - a.id)
                    .map((quote, i) => (
                      <tr key={quote.id} className="bg-white hover:bg-blue-200">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            {i + 1}
                          </div>
                        </td>

                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                          {getDate(quote.createdAt, "DD-MM-YYYY h:m a")}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                          {quote.title}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                          {quote.fullName}
                        </td>

                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                          {quote.email}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                          {quote.phone}
                        </td>

                        <td>
                          <div className="flex justify-center items-center">
                            {deleteLoading && deleteId == quote.id ? (
                              <Spinner />
                            ) : (
                              <BsTrash
                                className="cursor-pointer"
                                onClick={() => confirmDeleteHandler(quote.id)}
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
            <h2>No Quote yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Quotations;
