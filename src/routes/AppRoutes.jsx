import SignUpPage from "../pages/auth/SignUpPage";
import SignInPage from "../pages/auth/SignInPage";
import MoviesList from "/src/pages/movies/MoviesList";
import NavBar from "../components/common/NavBar";
import NewMovie from "/src/pages/movies/NewMovie";
import EditMovie from "/src/pages/movies/EditMovie";
import ViewMovie from "../pages/movies/ViewMovie";
import AdminTabel from "../pages/admin/AdminTabel";
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
