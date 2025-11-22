import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import LinkStats from "../pages/linkstats/LinkStats";
import NavBar from "../components/NavBar";

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000;
    return Date.now() > exp;
  } catch {
    return true;
  }
}

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return false;
  }
  return true;
};

const ProtectedRoute = () => {
  return isAuthenticated() ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

const PublicRoute = () => {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/stats/:code", element: <LinkStats /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
