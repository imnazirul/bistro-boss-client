import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddItems = async (data) => {
    const { name, category, recipe, price } = data;
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const menuItem = {
        name,
        category,
        recipe,
        price: parseFloat(price),
        image: res.data.data.display_url,
      };
      const response = await axiosSecure.post("/menu", menuItem);
      if (response.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} has been added to the Menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="mt-5">
      <SectionTitle
        heading="ADD AN ITEM"
        subHeading="What's new?"
      ></SectionTitle>
      <div>
        <form
          onSubmit={handleSubmit(handleAddItems)}
          className="grid md:grid-cols-2 gap-5"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is a required Field",
                },
              })}
              type="text"
              placeholder="Name"
              className="input input-bordered"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select a Category</span>
            </label>
            <select
              defaultValue="default"
              {...register("category", {
                required: {
                  value: true,
                  message: "Category is a required Field",
                },
              })}
              className="select select-bordered w-full "
            >
              <option disabled value="default">
                Select a Category
              </option>
              <option value="salad">Salad</option>
              <option value="dessert">Dessert</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="drinks">Drinks</option>
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              {...register("price", {
                required: {
                  value: true,
                  message: "Price is a required Field",
                },
              })}
              type="number"
              placeholder="Price"
              className="input input-bordered"
            />
            {errors.price && (
              <p className="text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe</span>
            </label>
            <textarea
              {...register("recipe", {
                required: {
                  value: true,
                  message: "Recipe is a required Field",
                },
              })}
              className="input input-bordered"
            ></textarea>
            {errors.recipe && (
              <p className="text-red-500">{errors.recipe.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Add Image</span>
            </label>
            <input
              {...register("image", {
                required: {
                  value: true,
                  message: "Image is a required Field",
                },
              })}
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />{" "}
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </div>
          <div></div>

          <div className="form-control mt-6  self-start  ">
            <button className="btn  bg-[#e7a043] hover:bg-blue-500  text-lg text-white ">
              ADD ITEM <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
