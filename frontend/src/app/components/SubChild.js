import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubChild({ id, parentId, hasChild, categoryName }) {
  const [data, setData] = useState([]);
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

  if (!hasChild) return <li className="font-light">{categoryName}</li>;

  return (
    <li className="font-semibold">
      {categoryName}
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
    </li>
  );
}
