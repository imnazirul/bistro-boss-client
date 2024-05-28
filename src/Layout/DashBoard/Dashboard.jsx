import { BiMenu } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import {
  FaBook,
  FaCalendar,
  FaCartShopping,
  FaEnvelope,
  FaList,
  FaPaypal,
  FaShop,
  FaStreetView,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../../CustomHooks/useCart";
import useAdmin from "../../CustomHooks/useAdmin";
// import Navbar from "../../Shared/Navbar/Navbar";

const Dashboard = () => {
  const { cart } = useCart();

  //   check if user is an admin
  const { isAdmin } = useAdmin();

  return (
    <>
      <div className="flex justify-between gap-5 px-5 ">
        {/* dashboard sidebar */}
        <div className="md:max-w-80 h-full overflow-hidden text-white lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <BiMenu className="text-xl"></BiMenu>
          </label>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full space-y-1 bg-[#D1A054]">
              <li className="mb-2">
                <div>
                  <h1 className="text-3xl">Bistro Boss</h1>
                </div>
              </li>
              {/* Sidebar content here */}
              {isAdmin ? (
                <>
                  {" "}
                  <li>
                    <NavLink to="/dashboard/admin">
                      <FaHome></FaHome> ADMIN HOME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/addItems">
                      <FaUtensils></FaUtensils>ADD ITEMS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageItems">
                      <FaList></FaList> MANAGE ITEMS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageBookings">
                      <FaBook></FaBook>MANAGE BOOKINGS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/users">
                      <FaUsers></FaUsers> ALL USERS
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li>
                    <NavLink to="/">
                      <FaHome></FaHome> USERS HOME
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reservation">
                      <FaCalendar></FaCalendar>RESERVATION
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/payment">
                      <FaPaypal></FaPaypal> PAYMENT HISTORY
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/cart">
                      <FaCartShopping></FaCartShopping> MY CART ({cart.length})
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/review">
                      <FaStreetView></FaStreetView> ADD REVIEW
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/review">
                      <FaBook></FaBook> MY BOOKINGS
                    </NavLink>
                  </li>
                </>
              )}

              <div className="divider"></div>

              <li>
                <NavLink to="/">
                  <FaHome></FaHome> HOME
                </NavLink>
              </li>
              <li>
                <NavLink to="/review">
                  <BiMenu></BiMenu> MENU
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop">
                  <FaShop></FaShop> SHOP
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact">
                  <FaEnvelope></FaEnvelope> CONTACT
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
