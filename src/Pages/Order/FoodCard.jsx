import Swal from "sweetalert2";
import useAuth from "../../CustomHooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure";
import useCart from "../../CustomHooks/useCart";

/* eslint-disable react/prop-types */
const FoodCard = ({ item }) => {
  const { name, recipe, price, image, category, _id } = item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCart();

  const handleAddToCart = () => {
    if (user && user.email) {
      const cart = {
        menuId: _id,
        email: user.email,
        name,
        recipe,
        price,
        category,
        image,
      };
      axiosSecure.post("/carts", cart).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "middle",
            icon: "success",
            title: `${name} has been added to cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,  Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="card bg-base-200  border-2">
      <figure className="relative">
        <img src={image} alt="Shoes" className="rounded-t-xl w-full" />
        <p className="bg-black  absolute top-2 right-2 py-2 px-3 text-yellow-600">
          ${price}
        </p>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn bg-base-300 text-yellow-700 hover:bg-black hover:border-b-4 border-0 hover:outline hover:outline-yellow-700 hover:outline-1  border-yellow-700 border-b-4"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
