import axios from "axios";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { logOut, loading } = useAuth();
  // console.log(logOut, loading);

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("interceptor hitting", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      console.log("req error", error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // console.log("res error", error);
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
          if (!loading) {
            // console.log(logOut);
            logOut()
              .then(() => <Navigate to="/login"></Navigate>)
              .catch((err) => console.log(err));
          }
        }
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );
  }, [loading, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
