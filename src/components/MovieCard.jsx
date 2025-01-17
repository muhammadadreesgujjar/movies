import React, { useState } from "react";
import "../styles/moviesList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ContextApi from "../context/ContextApi";
import { setItem } from "../helpers/utils/localStorage";
import Modal from "../components/Modal";

const MovieCard = ({ id, imgSrc, name, publishYear }) => {
  const [openModal, setOpenModal] = useState(false);
  const { state, setState } = useContext(ContextApi);
  const navigate = useNavigate();
  const handleBox = (id) => {
    // navigate(`/editmovie?id=${id}`);
    navigate(`/viewmovie?id=${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/editmovie?id=${id}`);
    // navigate(`/viewmovie?id=${id}`);
  };

  const handleModal = (e, id) => {
    console.log("delete ");
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    const filteredData = state.filter((item) => item.id != id);
    setState(filteredData);
    setItem("movies", filteredData);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        deleteItem={() => handleDelete(id)}
      />
      <div className="movieBox p-2" onClick={() => handleBox(id)}>
        <div className="h-4/5 rounded-xl relative">
          <img
            src={imgSrc}
            alt="img"
            width="100%"
            height="100%"
            className="object-cover h-full rounded-xl"
          />
          <div className="absolute top-3 right-2">
            <span
              className="p-2 px-3 rounded-md border-red-500 border-2 mx-2"
              onClick={handleModal}
              // onClick={(e) => handleDelete(e, id)}
            >
              <FontAwesomeIcon icon={faTrash} className="text-red-500" />
            </span>
            <span
              className="p-2 px-3 rounded-md border-gray-500 border-2 mx-2"
              onClick={(e) => handleEdit(e, id)}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="text-gray-500" />
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-around items-start h-1/5">
          <h1 className="text-xl font-normal flex items-center justify-center gap-2">
            {name}
          </h1>
          <h1 className="text-xs font-normal flex items-center justify-center gap-2">
            {publishYear}
          </h1>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
