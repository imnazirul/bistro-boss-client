import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
