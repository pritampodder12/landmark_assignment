import React from "react";
import PureModal from "react-pure-modal";
import Loader from "./Loader";

export default function ModalContent({
  modal,
  setModal,
  inputRef,
  handleSubmit,
  loading,
  categoryName,
}) {
  return (
    <PureModal
      header={
        modal === "add"
          ? "Add a sub-category"
          : modal === "edit"
          ? "Edit Category Name"
          : modal === "delete"
          ? `Enter \`\`${categoryName}\`\` to confirm delete.`
          : ""
      }
      footer={
        modal && (
          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <div className="flex items center justify-center">
              {loading && <Loader />}
              <div className="ml-2 text-lg">
                {modal === "add"
                  ? "Add"
                  : modal === "edit"
                  ? "Update"
                  : modal === "delete"
                  ? "Delete"
                  : ""}
              </div>
            </div>
          </button>
        )
      }
      isOpen={Boolean(modal)}
      closeButton={<img src="close.svg" className="cursor-pointer" />}
      onClose={() => {
        setModal();
        return true;
      }}
    >
      <label className="block text-sm font-medium mb-2 dark:text-white">
        Category Name
      </label>
      <input
        ref={inputRef}
        type="text"
        className="py-3 px-4 w-full border border-black rounded-lg text-sm"
        placeholder="Enter a category name"
      />
    </PureModal>
  );
}
