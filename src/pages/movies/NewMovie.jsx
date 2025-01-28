import { useState } from "react";
import "../../styles/NewMovie.css";
import { useNavigate } from "react-router-dom";
import { movieCardValidate } from "../../helpers/utils/formValidations";
import UploadMovieCard from "../../components/movies/UploadMovieCard";
import useFetchAPI from "../../hooks/useFetchAPI";

const NewMovie = () => {
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
  const [data, loading, error0, fecthCall] = useFetchAPI(`/movies/new-movie`);

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    const valid = movieCardValidate(inputValue, setError);
    if (!valid) {
      return;
    } else {
      const data = new FormData();
      data.append("file", inputValue.img);
      data.append("name", inputValue.name);
      data.append("publishYear", inputValue.publishYear);
      const res = await fecthCall("POST", data);

      if (!error0) {
        navigate("/");
        return;
      }
    }
  };

  const handleChangeFile = (e) => {
    setInputValue((prev) => {
      return { ...prev, img: e.target.files[0] };
    });
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileName(e.target.result);
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
