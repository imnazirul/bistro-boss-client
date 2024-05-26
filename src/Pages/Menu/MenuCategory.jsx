/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import CoverHero from "../../components/CoverHero.jsx/CoverHero";

const MenuCategory = ({ menu, menuImg, menuTitle }) => {
  return (
    <div className="mb-8 lg:mb-16">
      {menuTitle && <CoverHero img={menuImg} title={menuTitle}></CoverHero>}
      <div className=" grid md:grid-cols-2 gap-5">
        {menu.map((data) => (
          <MenuItem key={data._id} item={data}></MenuItem>
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Link to={`/order/${menuTitle}`}>
          {" "}
          <button className="btn bg-base-300 text-yellow-700 hover:bg-black hover:border-b-4 border-0 hover:outline hover:outline-yellow-700 hover:outline-1  border-yellow-700 border-b-4">
            {" "}
            ORDER YOUR FAVORITE FOOD{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
