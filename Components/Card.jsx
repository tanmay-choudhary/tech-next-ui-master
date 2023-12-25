import { Edit, Trash2, Trash2Icon } from "lucide-react";
import { API_URL } from "@/constants";
import React, { useState } from "react";

function Card({ patentId, description, date, phase, handleApplyFilter }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPhase, setEditedPhase] = useState(phase);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const response = await fetch(`${API_URL}/delete-patent`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patent_id: patentId,
      }),
    });
    //console.log("ho");
    handleApplyFilter();
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleEditConfirm = async () => {
    const response = await fetch(`${API_URL}/update-patent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patent_id: patentId,
        phase: editedPhase,
        patent_text: editedDescription,
      }),
    });
    handleApplyFilter();
    setEditModalOpen(false);
  };

  const handleEditCancel = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="bg-white shadow-xl rounded-xl border border-blue-100 p-4 space-y-5 mb-5">
        <div className="flex items-center justify-end">
          <button onClick={handleEditClick}>
            <Edit color="blue" />
          </button>{" "}
          <button className="ml-4" onClick={handleDeleteClick}>
            <Trash2 color="red" />
          </button>{" "}
        </div>
        <p className="bg-blue-100 px-3 py-2 rounded-3xl font-medium text-sm inline-flex">
          {phase}
        </p>
        <h1 className="font-medium text-base text-black">
          PATENT ID:{" "}
          <span className="font-normal text-gray-500">{patentId}</span>
        </h1>
        <p className="text-base text-gray-600">{description}</p>
        <p className="font-medium text-base text-black">
          Date: <span className="text-gray-500 font-normal">{date}</span>
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-12 rounded-md items-center flex justify-center flex-col space-y-6">
            <Trash2Icon size={80} color="red" />
            <p className="max-w-xs text-center">
              Are you sure you want to delete data of{" "}
              <span className="text-blue-600 font-medium">
                Patent Id: {patentId}
              </span>
              ?
            </p>
            <div>
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white px-4 py-2 mr-8"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center mt-16 ">
          <div className="bg-white p-8 rounded-md items-center flex justify-center flex-col space-y-6 w-[90%] h-[78vh]">
            <p className="max-w-xs text-center font-medium">
              Edit data for{" "}
              <span className="text-blue-600 font-medium">
                Patent Id: {patentId}
              </span>
            </p>
            <label
              htmlFor="editedPhase"
              className="text-sm font-bold text-gray-700"
            >
              Phase:
            </label>
            <select
              id="editedPhase"
              name="editedPhase"
              value={editedPhase}
              onChange={(e) => setEditedPhase(e.target.value)}
              className="mb-4 w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Phase 1">Phase 1</option>
              <option value="Phase 2">Phase 2</option>
              <option value="Phase 3">Phase 3</option>
            </select>
            <label
              htmlFor="editedDescription"
              className=" text-sm font-bold text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="editedDescription"
              name="editedDescription"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="mb-4 w-full p-2 border border-gray-300 rounded-md h-[30vh]"
            ></textarea>
            <div>
              <button
                onClick={handleEditConfirm}
                className="bg-blue-500 text-white px-4 py-2 mr-8"
              >
                Update
              </button>
              <button
                onClick={handleEditCancel}
                className="bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
