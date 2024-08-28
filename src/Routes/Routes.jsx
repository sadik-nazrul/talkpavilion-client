import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Authentication/Login";
import Signup from "../Pages/Authentication/Signup";
import Dashboard from "../Layouts/Dashboard";
import Error from "../Pages/Errorpage/Error";
import Membership from "../Pages/Membership/Membership";
import Privateroute from "./Privateroute";
import AddPost from "../Pages/Dashboard/GoldMember/AddPost/AddPost";
import BronzeMemberRoute from "./BronzeMemberRoute";

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
    element: (
      <Privateroute>
        <Dashboard />
      </Privateroute>
    ),
    children: [
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "membership",
        element: (
          <BronzeMemberRoute>
            <Membership />
          </BronzeMemberRoute>
        ),
      },
    ],
  },
]);
