import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import LinkStats from "../pages/linkstats/LinkStats";
import HealthCheck from "../pages/healthcheck/HealthCheck";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/code/:code",
    element: <LinkStats />,
  },
  {
    path: "/healthz",
    element: <HealthCheck />,
  },
]);
