import React, { useEffect, useState } from "react";
import "../styles/moviesList.css";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";
import ContextApi from "../context/ContextApi";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../helpers/utils/localStorage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const MoviesList = () => {
  const [imagesPath, setImagesPath] = useState([]);
  const navigate = useNavigate();
  const { state, setState } = useContext(ContextApi);

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

    const storedArr = getItem("movies");
    if (storedArr) {
      setState(storedArr);
    }
  }, []);

  useEffect(() => {
    const storedArr = getItem("movies");

    if (!storedArr) {
      setItem("movies", state);
      setImagesPath(state);
      return;
    }
    // setState(storedArr);
    setImagesPath(storedArr);

    // if (!storedArr) {
    //   setItem('movies',state);
    //   setImagesPath(state);
    //   return;
    // }
    // if (state.length < storedArr.length) {
    //   setState(storedArr);
    //   setImagesPath(state);
    // }
    // if (state.length > storedArr.length) {
    //   setItem('movies',state);
    //   setImagesPath(state);
    // }
    // setItem('movies',state);
  }, [state]);

  useEffect(() => {
    setImagesPath(state);
  }, [state]);

  const handleClick = () => {
    navigate("/newmovie");
  };

  return (
    <div className="flex text-white mainDiv bg-bottom">
      <div className="parrentBox flex flex-col mx-auto my-28 gap-24 md:w-4/5 w-full">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
            My movies
            <span onClick={handleClick} className="hover:cursor-pointer">
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap flex-col md:flex-row gap-5  w-full">
            {imagesPath.map((item, index) => (
              <div key={index}>
                <MovieCard
                  id={item.id}
                  imgSrc={item.img}
                  name={item.name}
                  publishYear={item.publishYear}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="my-9">
          <div className="flex justify-center gap-3">
            <p className="text-center leading-6 text-xl">Prev</p>
            <button type="button" className="logInBtn rounded-md font-semibold">
              1
            </button>
            <button
              type="button"
              className="logInBtn logInButtonNext rounded-md font-semibold"
            >
              2
            </button>
            <p className="text-center leading-6 text-xl">Next</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
