import { Link, NavLink } from "react-router-dom";
import useAuth from "../../CustomHooks/useAuth";
import toast from "react-hot-toast";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../CustomHooks/useCart";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { cart } = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((err) => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!user && (
        <>
          {" "}
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/contact">Contact Us</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard/admin">Dashboard</NavLink>
        </li>
      )}
      <li>
        <NavLink to="/menu">Our Menu</NavLink>
      </li>
      <li>
        <NavLink to="/order/salads">Order Food</NavLink>
      </li>
    </>
  );
  return (
    <div className="flex justify-center relative">
      <div className="navbar container mx-auto px-5 lg:px-10 fixed max-w-[1200px] bg-black z-50 bg-opacity-20 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <Link to="/dashboard/cart">
            <button className="flex gap-1">
              <FaCartShopping className="text-2xl"></FaCartShopping>
              <div className="bg-yellow-600 -mt-2 text-sm text-white font-medium px-2 rounded-3xl mr-3">
                +{cart.length}
              </div>
            </button>
          </Link>
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : user ? (
            <>
              <div className="avatar mr-1">
                <div className="w-12 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <button onClick={handleLogOut} className="btn">
                LogOut
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
