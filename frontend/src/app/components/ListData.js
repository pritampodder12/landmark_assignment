import React from "react";
import Tooltip from "./Tooltip";

export default function ListData({ categoryName, setModal }) {
  return (
    <div className="flex">
      <div>{categoryName}</div>
      <div className="flex ml-6 space-x-2">
        <div className="relative" onClick={() => setModal("add")}>
          <img src="add.svg" className="cursor-pointer peer" />
          <Tooltip content="Add Sub category" peerId="add" />
        </div>
        <div className="relative">
          <img
            src="edit.svg"
            className="cursor-pointer peer"
            onClick={() => setModal("edit")}
          />
          <Tooltip content="Edit" peerId="edit" />
        </div>
        <div className="relative">
          <img
            src="delete.svg"
            className="cursor-pointer peer"
            onClick={() => setModal("delete")}
          />
          <Tooltip content="Delete" peerId="delete" />
        </div>
      </div>
    </div>
  );
}
