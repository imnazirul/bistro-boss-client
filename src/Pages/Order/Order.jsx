import CoverHero from "../../components/CoverHero.jsx/CoverHero";
import orderImg from "../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../CustomHooks/useMenu";
import OrderTab from "../../components/OrderTab/OrderTab";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Order = () => {
  const categories = ["salads", "pizzas", "soups", "desserts", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [index, setIndex] = useState(initialIndex);

  const menu = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drink = menu.filter((item) => item.category === "drinks");
  return (
    <div className="mb-8 lg:mb-16">
      <CoverHero img={orderImg} title="ORDER FOOD"></CoverHero>

      <Tabs
        defaultIndex={index}
        onSelect={(index) => {
          setIndex(index);
        }}
      >
        <TabList>
          <Tab>SALADS</Tab>
          <Tab>PIZZAS</Tab>
          <Tab>SOUPS</Tab>
          <Tab>DESSERTS</Tab>
          <Tab>DRINKS</Tab>
        </TabList>

        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>

        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drink}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
