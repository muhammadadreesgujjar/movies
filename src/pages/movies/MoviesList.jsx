import { useEffect, useState } from "react";
import "../../styles/moviesList.css";
import MovieCard from "../../components/movies/MovieCard";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useLocalStorageHandler from "../../hooks/useLocalStorageHandler";
import useFetchAPI from "../../hooks/useFetchAPI";

const MoviesList = () => {
  const [data, loading, error, fecthCall] = useFetchAPI("/movies/all-movies");
  const [data1, loading1, error1, fecthCall1] = useFetchAPI(
    "/permision/user-permisions"
  );

  useLocalStorageHandler();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [permision, setPermision] = useState([]);

  const handleNext = () => {
    setPage((prev) => {
      if (data.length < page * 8 + 8) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const handlePrev = () => {
    setPage((prev) => {
      if (page == 0) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  useEffect(() => {
    (async () => {
      const res = await fecthCall();
    })();
    (async () => {
      const userPermision = await fecthCall1();
      setPermision([...userPermision.permisions]);
    })();
  }, []);

  return (
    <div className="flex text-white mainDiv bg-bottom">
      <div className="parrentBox flex flex-col mx-auto my-28 gap-24 md:w-4/5 w-full">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
            My movies
            {permision.includes("create") && (
              <span
                onClick={() => navigate("/newmovie")}
                className="hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </span>
            )}
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-wrap flex-col md:flex-row gap-5  w-full">
            {data.slice(page * 8, page * 8 + 8).map((item, index) => (
              <div key={index}>
                <MovieCard
                  id={item._id}
                  imgSrc={`${import.meta.env.VITE_BACKEND_URL}${item.imgURL}`}
                  name={item.name}
                  publishYear={item.publishYear}
                  permision={permision}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="my-9">
          <div className="flex justify-center gap-3">
            <p
              className="text-center leading-6 text-xl hover:cursor-pointer"
              onClick={handlePrev}
            >
              Prev
            </p>
            {data.map((item, index) => {
              if (data.length > index * 8) {
                if (index == page) {
                  return (
                    <button
                      key={index}
                      type="button"
                      className="bg-[#2bd17ed9] py-1 px-3 rounded-md font-semibold"
                    >
                      {index + 1}
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    type="button"
                    className="bg-[black] py-1 px-3 rounded-md font-semibold"
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                );
              }
            })}
            <p
              className="text-center leading-6 text-xl hover:cursor-pointer"
              onClick={handleNext}
            >
              Next
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
