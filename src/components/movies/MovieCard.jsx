import React, { useState } from "react";
import "../../styles/moviesList.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "../common/Modal";
import useFetchAPI from "../../hooks/useFetchAPI";

const MovieCard = ({ id, imgSrc, name, publishYear, permision }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [data, loading, error, fecthCall] = useFetchAPI(
    `/movies/delete-movie?id=${id}`
  );
  const handleBox = (id) => {
    navigate(`/viewmovie?id=${id}`);
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/editmovie?id=${id}`);
  };

  const handleModal = (e, id) => {
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleDelete = async () => {
    await fecthCall("DELETE");
    if (!error) {
      window.location.reload();
      setOpenModal(false);
      return;
    }
  };

  return (
    <>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        deleteItem={() => handleDelete(id)}
      />
      <div
        className="movieBox p-2"
        onClick={permision.includes("view") ? () => handleBox(id) : null}
      >
        <div className="h-4/5 rounded-xl relative">
          <img
            src={imgSrc}
            alt="img"
            width="100%"
            height="100%"
            className="object-cover h-full rounded-xl"
          />
          <div className="absolute top-3 right-2">
            {permision.includes("delete") && (
              <span
                className="p-2 px-3 rounded-md border-red-500 border-2 mx-2"
                onClick={handleModal}
              >
                <FontAwesomeIcon icon={faTrash} className="text-red-500" />
              </span>
            )}
            {permision.includes("update") && (
              <span
                className="p-2 px-3 rounded-md border-gray-500 border-2 mx-2"
                onClick={(e) => handleEdit(e, id)}
              >
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="text-gray-500"
                />
              </span>
            )}
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
