import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const AxiosPublic = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosPublic = () => {
  return AxiosPublic;
};

export default useAxiosPublic;
