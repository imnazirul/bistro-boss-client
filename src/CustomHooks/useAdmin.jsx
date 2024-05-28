import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: ["isadmin"],
    queryFn: async () => {
      const res = await axiosSecure(`users/admin/${user?.email}`);
      //   console.log(res.data);
      return res.data?.admin;
    },
  });

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
