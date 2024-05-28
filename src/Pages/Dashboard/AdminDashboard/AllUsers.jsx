import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      return response.data;
    },
  });

  const handleMakeAdmin = (id, name) => {
    // console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "Do You Want To Make This Person Admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "middle",
              icon: "success",
              title: `${name} is Admin Now`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="pt-3">
      <SectionTitle
        heading="MANAGE ALL USERS"
        subHeading="How many??"
      ></SectionTitle>
      <div className="bg-base-200 rounded-xl p-5">
        <div className="px-5">
          <h1 className="text-3xl font-semibold">
            TOTAL USERS: {users.length}
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>INDEX</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {" "}
                    {user?.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user?.name)}
                        className="btn bg-yellow-600 btn-sm hover:bg-yellow-600"
                      >
                        <FaUsers className="text-xl text-white "></FaUsers>
                      </button>
                    )}
                  </td>
                  <td>
                    {user?.role === "admin" ? (
                      <button
                        disabled={true}
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn"
                      >
                        <FaTrashAlt className="text-xl "></FaTrashAlt>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn"
                      >
                        <FaTrashAlt className="text-xl text-red-600"></FaTrashAlt>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
