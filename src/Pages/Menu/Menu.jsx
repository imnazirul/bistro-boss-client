import { Helmet } from "react-helmet-async";
import menuImg from "../../assets/home/banner.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import useMenu from "../../CustomHooks/useMenu";
import MenuCategory from "./MenuCategory";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CoverHero from "../../components/CoverHero.jsx/CoverHero";

const Menu = () => {
  const { menu } = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>Menu | Bistro Boss</title>
      </Helmet>
      <CoverHero title="Our Menu" img={menuImg}></CoverHero>
      {/* offered items */}
      <SectionTitle
        heading="TODAY'S OFFER"
        subHeading="Don't miss"
      ></SectionTitle>
      <MenuCategory menu={offered}></MenuCategory>

      {/* dessert items */}

      <MenuCategory
        menuTitle="desserts"
        menu={dessert}
        menuImg={dessertImg}
      ></MenuCategory>

      {/* soup items */}
      <MenuCategory
        menuTitle="soups"
        menu={soup}
        menuImg={soupImg}
      ></MenuCategory>

      {/* salad items */}
      <MenuCategory
        menuTitle="salads"
        menu={salad}
        menuImg={saladImg}
      ></MenuCategory>

      {/* pizza items */}

      <MenuCategory
        menuTitle="pizzas"
        menu={pizza}
        menuImg={pizzaImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
