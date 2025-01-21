import { useEffect } from "react";
import { getItem, setItem } from "../helpers/utils/localStorage";
import { useSelector, useDispatch } from "react-redux";
import { setMovieList } from "../reducers/movieListSlice";
import { setUser } from "../reducers/usersAuthSlice";

const useLocalStorageHandler = () => {
  const selectorMoviesList = useSelector((state) => state.moviesList);
  const dispatchMoviesList = useDispatch();
  const dispatchUsersAuth = useDispatch();
  const selectorUsersAuth = useSelector((state) => state.usersAuth);

  useEffect(() => {
    const getMoviesList = getItem("movies");
    if (!getMoviesList) {
      setItem("movies", selectorMoviesList);
      return;
    }
    dispatchMoviesList(setMovieList(getMoviesList));
  }, []);

  useEffect(() => {
    const getUsers = getItem("users");
    if (!getUsers) {
      setItem("users", selectorUsersAuth);
      return;
    }
    if (!getUsers.length) {
      setItem("users", selectorUsersAuth);
      return;
    }
    dispatchUsersAuth(setUser(getUsers));
  }, []);
};

export default useLocalStorageHandler;
