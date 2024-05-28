import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/DashBoard/Dashboard";
import Cart from "../Pages/Dashboard/UserDashboard/Cart";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AdminHome from "../Pages/Dashboard/AdminDashboard/AdminHome";
import AddItems from "../Pages/Dashboard/AdminDashboard/AddItems";
import ManageItems from "../Pages/Dashboard/AdminDashboard/ManageItems";
import UpdateItem from "../Pages/Dashboard/AdminDashboard/UpdateItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: (
          <PrivateRoute>
            <Menu></Menu>
          </PrivateRoute>
        ),
      },
      {
        path: "/order/:category",
        element: <Order></Order>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //normal user routes
      {
        path: "cart",
        element: <Cart></Cart>,
      },

      //admin only routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "addItems",
        element: (
          <AdminRoute>
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: async ({ params }) =>
          await fetch(`http://localhost:5000/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
