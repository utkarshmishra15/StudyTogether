import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Assignments from "../pages/Assignments/Assignments";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import PendingAssignment from "../pages/PendingAssignment/PendingAssignment";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PrivateRoutes from "./PrivateRoutes";
import MySubmittedAssignment from "../pages/MySubmittedAssignment/MySubmittedAssignment";
import ViewAssignment from "../components/ViewAssignment/ViewAssignment";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
        loader: () =>
          fetch("https://online-study-server-iota.vercel.app/assignments"),
      },
      {
        path: "/create_assignment",
        element: (
          <PrivateRoutes>
            <CreateAssignment></CreateAssignment>
          </PrivateRoutes>
        ),
      },
      {
        path: "/pending_assignment",
        element: (
          <PrivateRoutes>
            <PendingAssignment></PendingAssignment>
          </PrivateRoutes>
        ),
        loader: () =>
          axios("https://online-study-server-iota.vercel.app/answers", {
            withCredentials: true,
          }),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/my_submitted_assignment",
        element: (
          <PrivateRoutes>
            <MySubmittedAssignment></MySubmittedAssignment>
          </PrivateRoutes>
        ),
        loader: () =>
          axios("https://online-study-server-iota.vercel.app/answers", {
            withCredentials: true,
          }),
      },
      {
        path: "/view_assignment/:id",
        element: (
          <PrivateRoutes>
            <ViewAssignment></ViewAssignment>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://online-study-server-iota.vercel.app/assignments/${params.id}`
          ),
      },
      {
        path: "/updateAssignment/:id",
        element: (
          <PrivateRoutes>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://online-study-server-iota.vercel.app/assignments/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
