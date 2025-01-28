import { useEffect, useState } from "react";
import "../../styles/NewMovie.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { movieCardValidate } from "../../helpers/utils/formValidations";
import UploadMovieCard from "../../components/movies/UploadMovieCard";
import useFetchAPI from "../../hooks/useFetchAPI";

const EditMovie = () => {
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
  const [data, loading, error0, fecthCall] = useFetchAPI(
    `/movies/find-movie?id=${paramValue}`
  );
  const [data1, loading1, error1, fecthCall1] = useFetchAPI(
    `/movies/update-movie?id=${paramValue}`
  );
  useEffect(() => {
    (async () => {
      const res = await fecthCall();
      setInputValue((prev) => {
        return {
          ...prev,
          name: res.name,
          publishYear: res.publishYear,
          img: res.imgURL,
        };
      });
      setFileName(`${import.meta.env.VITE_BACKEND_URL}${res.imgURL}`);
    })();
  }, []);

  const handleChange = (e) => {
    setInputValue((prevValue) => {
      return { ...prevValue, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    const valid = movieCardValidate(inputValue, setError);
    if (!valid) {
      return;
    }
    if (!valid) {
      return;
    } else {
      const data = new FormData();
      data.append("file", inputValue.img);
      data.append("name", inputValue.name);
      data.append("publishYear", inputValue.publishYear);
      const res = await fecthCall1("POST", data);
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
