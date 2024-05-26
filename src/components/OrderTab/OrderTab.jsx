/* eslint-disable react/prop-types */
import FoodCard from "../../Pages/Order/FoodCard";

const OrderTab = ({ items }) => {
  return (
    <div className="grid md:grid-cols-3 gap-5">
      {items.map((item) => (
        <FoodCard key={item._id} item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
