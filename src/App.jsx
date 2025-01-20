import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MoviesList from "../src/pages/MoviesList";
import NavBar from "../src/pages/NavBar";
import NewMovie from "../src/pages/NewMovie";
import EditMovie from "../src/pages/EditMovie";
import ContextApi from "./context/ContextApi";
import ViewMovie from "./pages/ViewMovie";
import AdminTabel from "./pages/AdminTabel";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";

function App() {
  const [array, setArray] = useState(dummyArray);

  return (
    <ContextApi.Provider value={{ state: array, setState: setArray }}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/newmovie" element={<NewMovie />} />
          <Route path="/editmovie" element={<EditMovie />} />
          <Route path="/viewmovie" element={<ViewMovie />} />
          <Route path="/admin" element={<AdminTabel />} />
        </Routes>
      </Router>
    </ContextApi.Provider>
  );
}

export default App;

const dummyArray = [
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
