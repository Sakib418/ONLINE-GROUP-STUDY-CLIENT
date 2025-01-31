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
import MySubmittedAssignments from "../pages/AssignmentsPage/MySubmittedAssignments";
import PendingAssignments from "../pages/AssignmentsPage/PendingAssignments";

 
  
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
          element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
        },
        {
          path: '/assignments',
          element: <Assignments></Assignments>,
          loader: () => fetch('https://online-group-study-server-pi-lyart.vercel.app/AllAssignments')
        },
        {
          path: '/updateAssignment/:id',
          element: <UpdateAssignment></UpdateAssignment>,
          loader: ({params}) => fetch(`https://online-group-study-server-pi-lyart.vercel.app/GetAssignment/${params.id}`)
        },
        {
          path: '/assignmentDetail/:id',
          element: <PrivateRoute><AssignmentDetail></AssignmentDetail></PrivateRoute>
          //loader: ({params}) => fetch(`https://online-group-study-server-pi-lyart.vercel.app/GetAssignment/${params.id}`)
        },
        {
          path: '/mySubmittedAssignment/:email',
          element: <PrivateRoute><MySubmittedAssignments></MySubmittedAssignments></PrivateRoute>
          //loader: ({params}) => fetch(`https://online-group-study-server-pi-lyart.vercel.app/GetAssignmentDataByEmail/${params.email}`)
        },
        {
          path: '/PendingAssignment',
          element: <PrivateRoute><PendingAssignments></PendingAssignments></PrivateRoute>,
          loader: () => fetch('https://online-group-study-server-pi-lyart.vercel.app/GetPendingAssignment')
        }
      ]
    },
  ]);

  export default router;