import { configureStore } from "@reduxjs/toolkit";
import usersAuthSlice from "./reducers/usersAuthSlice";
import movieListSlice from "./reducers/movieListSlice";

const store = configureStore({
  reducer: {
    usersAuth: usersAuthSlice,
    moviesList: movieListSlice,
  },
});

export default store;
