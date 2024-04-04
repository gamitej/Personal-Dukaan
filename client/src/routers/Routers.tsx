import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// lazy loading components
const Sales = lazy(() => import("@/pages/Sales"));
const Stocks = lazy(() => import("@/pages/Stocks"));
const Overview = lazy(() => import("@/pages/Overview"));
const Purchase = lazy(() => import("@/pages/Purchase"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Payments = lazy(() => import("@/pages/Payments"));

const Router = () => {
  const route = useRoutes([
    {
      path: "/",
      element: <Overview />,
    },
    {
      path: "/stocks",
      element: <Stocks />,
    },
    {
      path: "/purchase",
      element: <Purchase />,
    },
    {
      path: "/sales",
      element: <Sales />,
    },
    {
      path: "/expenses",
      element: <Expenses />,
    },
    {
      path: "/payments",
      element: <Payments />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return route;
};

export default Router;
