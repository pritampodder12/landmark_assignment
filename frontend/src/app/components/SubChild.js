import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ListData from "./ListData";
import ModalContent from "./ModalContent";

export default function SubChild({ id, parentId, hasChild, categoryName }) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasChild) {
      axios
        .get(`http://localhost:4000/categories/getSubCategory/${id}`)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => console.log("err", err));
    }
  }, [hasChild]);

  useEffect(() => {
    if (modal === "edit") inputRef.current.value = categoryName;
  }, [modal]);

  function handleSubmit() {
    const value = inputRef.current.value;
    if (!value) return setModal(false);
    else {
      if (modal === "add") {
        setLoading(true);
        axios
          .post(`${process.env.NEXT_PUBLIC_BE_URL}/categories/create`, {
            categoryName: inputRef.current.value,
            parentId: id,
          })
          .finally(() => {
            setLoading(false);
            setModal();
            window.location.reload();
          });
      }
      if (modal === "edit") {
        setLoading(true);
        axios
          .post(`${process.env.NEXT_PUBLIC_BE_URL}/categories/update`, {
            newName: inputRef.current.value,
            categoryId: id,
          })
          .finally(() => {
            setLoading(false);
            setModal();
            window.location.reload();
          });
      }

      if (modal === "delete") {
        if (inputRef.current.value !== categoryName) {
          return setModal();
        }
        axios
          .post(`${process.env.NEXT_PUBLIC_BE_URL}/categories/delete`, {
            categoryId: id,
          })
          .finally(() => {
            setLoading(false);
            setModal();
            window.location.reload();
          });
      }
    }
  }

  if (!hasChild)
    return (
      <li className="font-light">
        <ListData categoryName={categoryName} setModal={setModal} />
        <ModalContent
          handleSubmit={handleSubmit}
          inputRef={inputRef}
          modal={modal}
          setModal={setModal}
          loading={loading}
          categoryName={categoryName}
        />
      </li>
    );

  return (
    <li className="font-semibold">
      <ListData categoryName={categoryName} setModal={setModal} />
      <ul>
        {data.map((el) => (
          <li key={el.id} className="list-disc ml-8">
            <SubChild
              id={el.id}
              parentId={el.parentId}
              hasChild={el.hasChild}
              categoryName={el.categoryName}
            />
          </li>
        ))}
      </ul>
      <ModalContent
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        modal={modal}
        setModal={setModal}
        loading={loading}
        categoryName={categoryName}
      />
    </li>
  );
}
