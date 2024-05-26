import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../CustomHooks/useMenu";

const PopularMenu = () => {
  const menu = useMenu();
  const popularMenu = menu.filter((item) => item.category === "popular");

  return (
    <>
      <SectionTitle
        heading="Popular Menu"
        subHeading="FROM OUR MENU"
      ></SectionTitle>
      <div className="mb-8 lg:mb-16 grid md:grid-cols-2 gap-5">
        {popularMenu.map((data) => (
          <MenuItem key={data._id} item={data}></MenuItem>
        ))}
      </div>
    </>
  );
};

export default PopularMenu;
