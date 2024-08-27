import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Dashboard from "../Layouts/Dashboard";
import Error from "../Pages/Errorpage/Error";
import Membership from "../Pages/Membership/Membership";
import Privateroute from "./Privateroute";

export const router = createBrowserRouter([
  // Common Routes
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/membership",
        element: (
          <Privateroute>
            <Membership />
          </Privateroute>
        ),
      },
    ],
  },

  //   Authentication routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },

  //   Dashboard Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
