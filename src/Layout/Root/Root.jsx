import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const Root = () => {
  return (
    <>
      <div className="flex justify-center ">
        <Navbar></Navbar>{" "}
      </div>
      <div className="px-5 lg:px-10 mx-auto container">
        <Outlet></Outlet>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Root;
