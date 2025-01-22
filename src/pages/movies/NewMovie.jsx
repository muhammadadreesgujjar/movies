import React, { useEffect, useState } from "react";
import "../../styles/NewMovie.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../helpers/utils/localStorage";
import { useDispatch } from "react-redux";
import { addMovieList } from "../../reducers/movieListSlice";
import { movieCardValidate } from "../../helpers/utils/formValidations";
import UploadMovieCard from "../../components/movies/UploadMovieCard";

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
    const valid = movieCardValidate(inputValue, setError);
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
          <UploadMovieCard
            fileName={fileName}
            handleChangeFile={handleChangeFile}
            handleChange={handlechange}
            inputValue={inputValue}
            error={error}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default NewMovie;
