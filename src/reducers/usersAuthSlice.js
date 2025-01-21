import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/utils/localStorage";

const usersAuthSlice = createSlice({
  name: "usersAuth",
  initialState: [],
  reducers: {
    setUser: (state, actions) => {
      state = actions.payload;
      setItem("users", state);
      return state;
    },
    addUser: (state, actions) => {
      state = state.concat([actions.payload]);
      setItem("users", state);
      return state;
    },
  },
});

export const { setUser, addUser } = usersAuthSlice.actions;
export default usersAuthSlice.reducer;
