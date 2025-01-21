import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import MoviesList from "/src/pages/MoviesList";
import NavBar from "/src/pages/NavBar";
import NewMovie from "/src/pages/NewMovie";
import EditMovie from "/src/pages/EditMovie";
import ViewMovie from "../pages/ViewMovie";
import AdminTabel from "../pages/AdminTabel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<MoviesList />} />
            <Route path="/newmovie" element={<NewMovie />} />
            <Route path="/editmovie" element={<EditMovie />} />
            <Route path="/viewmovie" element={<ViewMovie />} />
            <Route path="/admin" element={<AdminTabel />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default AppRoutes;
