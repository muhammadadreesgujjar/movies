import React, { useEffect, useState } from "react";
import "../../styles/moviesList.css";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewCard = () => {
  const selector = useSelector((state) => state.moviesList);
  const [value, setValue] = useState({
    name: "",
    publishYear: "",
    img: "",
  });
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("id");
  useEffect(() => {
    const value = selector.find((item) => item.id == paramValue);
    if (value) {
      setValue({
        name: value.name,
        publishYear: value.publishYear,
        img: value.img,
      });
    }
  }, []);

  return (
    <div className="bgViewCard h-screen w-full pt-10">
      <div
        className="p-2 w-3/5 m-auto shadow-white shadow-sm rounded-lg"
        onClick={() => handleBox(id)}
      >
        <div className="h-96 rounded-xl">
          <img
            src={value.img}
            alt="img"
            width="100%"
            height="100%"
            className="object-contain h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-around items-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 my-4 text-white">
            Name : {value.name}
          </h1>
          <h1 className="text-2xs font-normal flex items-center justify-center gap-2 text-white">
            Publish Year : {value.publishYear}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
