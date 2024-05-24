/* eslint-disable react/prop-types */
const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex gap-3 p-5 bg-base-200 rounded-lg">
      <img
        className="max-w-[100px] rounded-full rounded-tl-none"
        src={image}
        alt=""
      />
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name} ------------</h3>
          <p>{recipe}</p>
        </div>
        <p className="text-yellow-500">${price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
