import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/utils/localStorage";

const initialArray = [
  {
    id: "72f3b488-fd14-4638-9280-0cccafaa849a",
    img: "/src/assets/images/boxImg1.png",
    name: "Movie1",
    publishYear: "2021",
  },
  {
    id: "27541513-d21e-4a16-a00f-4435b782b361",
    img: "/src/assets/images/boxImg2.png",
    name: "Movie2",
    publishYear: "2019",
  },
  {
    id: "07aa56bd-25e1-4fc5-a1b8-e8363a316400",
    img: "/src/assets/images/boxImg2.png",
    name: "Movie3",
    publishYear: "2022",
  },
  {
    id: "41ab26cb-4e9f-4b8c-82eb-3d679e96172e",
    img: "/src/assets/images/boxImg3.png",
    name: "Movie4",
    publishYear: "2023",
  },
];

const movieListSlice = createSlice({
  name: "movieList",
  initialState: initialArray,
  reducers: {
    setMovieList: (state, actions) => {
      return actions.payload;
    },
    addMovieList: (state, actions) => {
      state = state.concat([actions.payload]);
      setItem("movies", state);
      return state;
    },
    editMovieList: (state, actions) => {
      const updatedState = state.map((item) => {
        if (item.id == actions.payload.id) {
          return {
            ...item,
            ...actions.payload,
          };
        } else {
          return item;
        }
      });
      setItem("movies", updatedState);
      return updatedState;
    },
    deleteMovieList: (state, actions) => {
      state = state.filter((item) => item.id !== actions.payload);
      setItem("movies", state);
      return state;
    },
  },
});

export const { setMovieList, addMovieList, editMovieList, deleteMovieList } =
  movieListSlice.actions;
export default movieListSlice.reducer;
