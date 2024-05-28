import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
    <>
      <Toaster></Toaster>
      {noHeaderFooter || (
        <div className="flex justify-center ">
          <Navbar></Navbar>{" "}
        </div>
      )}
      <div className="px-5 lg:px-10 mx-auto container">
        <Outlet></Outlet>
        {noHeaderFooter || <Footer></Footer>}
      </div>
    </>
  );
};

export default Root;
