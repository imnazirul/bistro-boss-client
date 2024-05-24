import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularMenu = data.filter((item) => item.category === "popular");
        setMenuData(popularMenu);
      });
  }, []);
  return (
    <>
      <SectionTitle
        heading="Popular Menu"
        subHeading="FROM OUR MENU"
      ></SectionTitle>
      <div className="mb-8 lg:mb-16 grid md:grid-cols-2 gap-5">
        {menuData.map((data) => (
          <MenuItem key={data._id} item={data}></MenuItem>
        ))}
      </div>
    </>
  );
};

export default PopularMenu;
