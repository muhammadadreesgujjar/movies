import React, { useEffect, useState } from "react";
import "../../styles/NewMovie.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editMovieList } from "../../reducers/movieListSlice";
import { movieCardValidate } from "../../helpers/utils/formValidations";
import UploadMovieCard from "../../components/movies/UploadMovieCard";

const EditMovie = () => {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.moviesList);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    name: "",
    publishYear: "",
    img: "",
  });
  const [error, setError] = useState({
    name: null,
    publishYear: null,
  });
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get("id");

  useEffect(() => {
    const value = moviesList.find((item) => item.id == paramValue);
    if (value) {
      setInputValue((prev) => {
        return {
          ...prev,
          name: value.name,
          publishYear: value.publishYear,
          img: value.img,
        };
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
    const valid = movieCardValidate(inputValue, setError);
    if (!valid) {
      return;
    }
    dispatch(editMovieList({ id: paramValue, ...inputValue }));
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
          <UploadMovieCard
            fileName={fileName}
            handleChangeFile={handleChangeFile}
            handleChange={handleChange}
            inputValue={inputValue}
            error={error}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default EditMovie;
