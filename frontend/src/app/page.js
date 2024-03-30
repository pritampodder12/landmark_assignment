"use client";

import { useState, useEffect } from "react";
import SubChild from "./components/SubChild";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories/getSubCategory")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-200">
      <div className="w-1/2 h-2/3 text-xl">
        <ul>
          {data.map((el) => (
            <SubChild
              key={el.id}
              id={el.id}
              parentId={el.parentId}
              hasChild={el.hasChild}
              categoryName={el.categoryName}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

{
  /* <ul>
  <li>Coffee</li>
  <li>
    Tea
    <ul>
      <li>Black tea</li>
      <li>
        Green tea
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Milk</li>
</ul>; */
}
