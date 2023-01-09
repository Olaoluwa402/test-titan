import React, { useState, useEffect } from "react";
import { FaSearch, FaPaperPlane } from "react-icons/fa";
import { BsChevronDown, BsFilterSquare, BsTrash } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../../Modals/CustomModal/CustomModal";
import NewProperty from "./NewProperty";
import EditProperty from "./EditProperty";
import {
  getPropertiesAction,
  deletePropertyAction,
} from "../../../redux/actions/propertiesActions";
import Spinner from "../../Spinner/Spinner";
import Confirm from "../../Confirm/Confirm";
import { DELETE_PROPERTY_RESET } from "../../../redux/constants/propertiesConstants";

const Properties = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeletedId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const store = useSelector((store) => store.properties);
  const { loading, data } = store;
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (store) => store.deleteProperty
  );

  useEffect(() => {
    dispatch(getPropertiesAction());
    if (deleteSuccess) {
      dispatch({ type: DELETE_PROPERTY_RESET });
    }
  }, [dispatch, deleteSuccess]);

  const facilityHandler = () => {
    router.push("/properties/facilities");
  };

  const featureHandler = () => {};
  const imageHandler = () => {};
  const advantageHandler = () => {};
  const floorPlanHandler = () => {};

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
      dispatch(deletePropertyAction({ id: deleteId }));
    }
  };

  return (
    <>
      {/* new user modal */}
      {open && <Modal>{<NewProperty setOpen={setOpen} />}</Modal>}
      {openEdit && (
        <Modal>{<EditProperty setOpen={setOpenEdit} id={updateId} />}</Modal>
      )}
      {/* confirm delete modal */}
      {showDeleteModal && (
        <Modal>
          <Confirm
            text="Are you sure you want to delete this product?"
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
            New Property
          </button>

          <button
            onClick={facilityHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Facility
          </button>
          <button
            onClick={featureHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Feature
          </button>
          <button
            onClick={imageHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Image
          </button>
          <button
            onClick={advantageHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Advantage
          </button>
          <button
            onClick={floorPlanHandler}
            className="max-w-fit h-[32px] rounded-lg flex items-center justify-center p-3 bg-dark text-white cursor-pointer"
          >
            Add Floor Plan
          </button>
        </div>

        <div className="w-full h-auto bg-white drop-shadow-md rounded-xl p-5 mx-6 md:mx-0">
          {/* header table */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-Inter mb-6 md:mb-0 text-peppermartDark300 text-lg">
              Properties
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
          ) : data && data.properties && data.properties.length > 0 ? (
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
                      Location
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Area<span>(m</span>
                      <sup>2</sup>
                      <span>)</span>
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Price
                    </th>

                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      No of Beds
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      No of Baths
                    </th>
                    <th className="py-6 tracking-wide text-center whitespace-nowrap">
                      Parking Space
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.properties.map((property, i) => (
                    <tr
                      key={property.id}
                      className="bg-white hover:bg-blue-200"
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {i + 1}
                        </div>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center cursor-pointer">
                        <Link
                          href={`/admin/properties/[id]`}
                          as={`/admin/properties/${property.id}`}
                        >
                          {property.title}
                        </Link>
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {property.location}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {property.area}
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        ₦{property.pricing}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {property.no_of_beds}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {property.no_of_baths}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                        {property.parking_space}
                      </td>
                      <td>
                        <div className="flex justify-center items-center">
                          <MdOutlineEditNote
                            className="mr-3 cursor-pointer"
                            onClick={() => {
                              setUpdateId(property.id);
                              setOpenEdit((prev) => !prev);
                            }}
                          />
                          {deleteLoading && deleteId == property.id ? (
                            <Spinner />
                          ) : (
                            <BsTrash
                              className="cursor-pointer"
                              onClick={() => confirmDeleteHandler(property.id)}
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
            <h2>No Property yet</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Properties;
