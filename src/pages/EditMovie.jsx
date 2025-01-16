import React, { useEffect, useState } from "react";
import "../styles/NewMovie.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ContextApi from "../context/ContextApi";
import { setItem } from "../helpers/utils/localStorage";

const EditMovie = () => {
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const context = useContext(ContextApi);
  const [inputValue, setInputValue] = useState({
    name: "",
    publishYear: "",
    img: "",
  });
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("id");

  useEffect(() => {
    const { state } = context;
    const value = state.find((item) => item.id == paramValue);
    if (value) {
      setInputValue({
        name: value.name,
        publishYear: value.publishYear,
      });
      setFileName(value.img);
    }
  }, []);

  const handleChange = (e) => {
    setInputValue((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    const { state, setState } = context;
    const value = state.find((item) => item.id == paramValue);
    const updatedArray = state.map((item) => {
      if (item.id == value.id) {
        return {
          ...item,
          ...inputValue,
        };
      } else {
        return item;
      }
    });
    setItem("movies", updatedArray);
    setState(updatedArray);
    navigate(`/`);
  };

  const handleCancel = () => {
    navigate(`/`);
  };
  const handleChangeFile = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setInputValue((prevVal) => {
        setFileName(e.target.result);
        return { ...prevVal, img: e.target.result };
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="mainDiv h-screen text-white">
        <div className="w-4/5 mx-auto py-10">
          <h1 className="text-5xl font-semibold my-b">Edit</h1>
          <div className="parrentBox flex flex-col md:flex-row gap-8 pt-16">
            <div className="w-full h-full">
              <div className="rounded-xl flex flex-col justify-center items-center w-56 h-44 md:w-96 md:h-96 border-2 border-dotted">
                <button
                  type="button"
                  onClick={() => document.getElementById("inputfile").click()}
                  className="flex flex-col justify-center items-center h-full"
                >
                  {fileName ? (
                    <div className="p-4 h-full">
                      <img
                        src={fileName}
                        alt="alt"
                        className="rounded-2xl object-cover h-full"
                        height="100%"
                        width="100%"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="w-4 md:w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                          />
                        </svg>
                      </div>
                      <h1 className="text-xs my-2">Drop an image here</h1>
                    </>
                  )}
                  <input
                    type="file"
                    id="inputfile"
                    className="hidden"
                    onChange={(e) => handleChangeFile(e)}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <input
                type="name"
                name="name"
                id="name"
                value={inputValue.name}
                onChange={(e) => handleChange(e)}
                placeholder="Title"
                required
                className="inputFieldOne md:w-80 h-12 w-56 block rounded-md px-3 py-1.5 text-base text-white placeholder:text-white focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6"
              />
              <input
                type="publishYear"
                name="publishYear"
                value={inputValue.publishYear}
                onChange={(e) => handleChange(e)}
                id="publishYear"
                placeholder="Publish Year"
                required
                className="inputFieldOne md:w-80 md:h-12 w-56 block rounded-md px-3 py-1.5 text-base text-white outline-gray-300 placeholder:text-white focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-none sm:text-sm/6"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  className="button buttonSecond w-full h-11 border-2 border-white rounded-lg font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="button h-11 w-full rounded-lg font-semibold"
                  onClick={handleSubmit}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditMovie;
