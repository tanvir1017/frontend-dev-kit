import App from "@/App";
import Navbar from "@/components/navbar/navbar";
import ProtectedRoutes from "@/components/protectedRoutes";
import PublicRoutes from "@/components/publicRoutes";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import PersistLogin from "@/pages/login/persistLogin";
import Notes from "@/pages/notes/notes";
import Register from "@/pages/register/register";
import { Route, Routes } from "react-router";

const Routing = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" index element={<App />} />
          <Route
            path="home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="notes"
            element={
              <ProtectedRoutes>
                <Notes />
              </ProtectedRoutes>
            }
          />

          <Route
            path="login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </>
  );
};

export default Routing;
