import React, { useEffect, useState } from "react";
import "../styles/NewMovie.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../helpers/utils/localStorage";
import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { addMovieList } from "../reducers/movieListSlice";

const NewMovie = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    publishYear: "",
  });
  const [error, setError] = useState({
    name: null,
    publishYear: null,
  });
  useEffect(() => {
    const getuserMail = getItem("userMail");
    if (!getuserMail) {
      navigate("/signIn");
      return;
    }
    const users = getItem("users");
    if (!users) {
      navigate("/signIn");
      return;
    }
    const findUser = users.find((item) => item.email == getuserMail);
    if (!findUser) {
      navigate("/signIn");
      return;
    }
  }, []);

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    const valid = Validate(inputValue, setError);
    if (!valid) {
      return;
    } else {
      const obj = {
        id: uuidv4(),
        img: "/src/assets/images/boxImg3.png",
        ...inputValue,
      };
      dispatch(addMovieList(obj));
      navigate("/");
    }
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
          <h1 className="text-5xl font-semibold my-b">Create a new Movie</h1>
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
            <div className="flex flex-col gap-5 w-full">
              <InputField
                name="name"
                value={inputValue.value}
                onchange={handlechange}
                placeholder="Name"
                err={error.name}
              />
              <InputField
                name="publishYear"
                value={inputValue.publishYear}
                onchange={handlechange}
                placeholder="Publish Year"
                err={error.publishYear}
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMovie;

function Validate(inputValue, setError) {
  let isValid = true;
  if (inputValue.name.length < 25) {
    setError((prev) => ({
      ...prev,
      name: null,
    }));
    isValid = true;
  }

  if (!isNaN(inputValue.publishYear)) {
    setError((prev) => ({
      ...prev,
      publishYear: null,
    }));
    isValid = true;
  }

  if (inputValue.name == "") {
    setError((prev) => ({
      ...prev,
      name: "Name is required.",
    }));
    isValid = false;
  }

  if (inputValue.publishYear == "") {
    setError((prev) => ({
      ...prev,
      publishYear: "Publish Year is required.",
    }));
    isValid = false;
  }

  if (inputValue.name.length > 25) {
    setError((prev) => ({
      ...prev,
      name: "Name length should be less than 25.",
    }));
    isValid = false;
  }

  if (isNaN(inputValue.publishYear)) {
    setError((prev) => ({
      ...prev,
      publishYear: "Publish Year is not a number.",
    }));
    isValid = false;
  }

  return isValid;
}
