/* eslint-disable react/prop-types */
const FoodCard = ({ item }) => {
  return (
    <div className="card bg-base-200  border-2">
      <figure className="relative">
        <img src={item.image} alt="Shoes" className="rounded-t-xl w-full" />
        <p className="bg-black  absolute top-2 right-2 py-2 px-3 text-yellow-600">
          ${item.price}
        </p>
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.recipe}</p>
        <div className="card-actions">
          <button className="btn bg-base-300 text-yellow-700 hover:bg-black hover:border-b-4 border-0 hover:outline hover:outline-yellow-700 hover:outline-1  border-yellow-700 border-b-4">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
