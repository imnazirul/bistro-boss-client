import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../CustomHooks/useMenu";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const { menu, refetch } = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (id, name) => {
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
        axiosSecure.delete(`/menu/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${name} has been deleted.`,
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div className="mt-6">
      <SectionTitle
        heading="manage all items"
        subHeading="Hurry Up!"
      ></SectionTitle>
      <div>
        <h1 className="text-3xl font-semibold">Total Items: {menu.length}</h1>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>IMAGE</th>
                <th>ITEM NAME</th>
                <th>PRICE</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.price}</td>
                  <td>
                    <Link to={`/dashboard/updateItem/${item?._id}`}>
                      {" "}
                      <button className="btn bg-yellow-600 btn-sm hover:bg-yellow-600">
                        <FaEdit className="text-xl text-white "></FaEdit>
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item._id, item.name)}
                      className="btn"
                    >
                      <FaTrashAlt className="text-xl text-red-600"></FaTrashAlt>
                    </button>
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

export default ManageItems;
