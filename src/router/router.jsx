import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
import Assignments from "../pages/AssignmentsPage/Assignments";
import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
import AssignmentDetail from "../pages/AssignmentsPage/AssignmentDetail";
import PrivateRoute from "./PrivateRoute";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children : [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
          path: '/createAssignment',
          element: <CreateAssignment></CreateAssignment>
        },
        {
          path: '/assignments',
          element: <Assignments></Assignments>,
          loader: () => fetch('http://localhost:3000/AllAssignments')
        },
        {
          path: '/updateAssignment/:id',
          element: <UpdateAssignment></UpdateAssignment>,
          loader: ({params}) => fetch(`http://localhost:3000/GetAssignment/${params.id}`)
        },
        {
          path: '/assignmentDetail/:id',
          element: <PrivateRoute><AssignmentDetail></AssignmentDetail></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:3000/GetAssignment/${params.id}`)
        }
      ]
    },
  ]);

  export default router;