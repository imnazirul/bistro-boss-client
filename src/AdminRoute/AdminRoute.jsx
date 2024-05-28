/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useAdmin from "../CustomHooks/useAdmin";
import useAuth from "../CustomHooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useAdmin();

  if (loading || isAdminLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
