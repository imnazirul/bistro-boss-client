import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../CustomHooks/useAxiosPublic";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa6";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const item = useLoaderData();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { _id, name, image, recipe, price, category } = item;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const handleAddItems = async (data) => {
    const { name, category, recipe, price } = data;
    const imageFile = { image: data.image[0] };

    Swal.fire({
      title: "Do You Want to Save The Changes?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log(res.data);
        if (res.data.success) {
          const menuItem = {
            name,
            category,
            recipe,
            price: parseFloat(price),
            image: res.data.data.display_url,
          };
          const response = await axiosSecure.patch(`/menu/${_id}`, menuItem);
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "UPDATED!",
              text: `${name} has been deleted.`,
              icon: "success",
            });
          }
        }
      }
    });
  };

  return (
    <div className="mt-5">
      <SectionTitle heading="Update item"></SectionTitle>
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
              defaultValue={name}
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
              defaultValue={category}
              {...register("category", {
                required: {
                  value: true,
                  message: "Category is a required Field",
                },
              })}
              className="select select-bordered w-full "
            >
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
              {...register("price")}
              defaultValue={price}
              type="text"
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
              defaultValue={recipe}
              className="input input-bordered"
            ></textarea>
            {errors.recipe && (
              <p className="text-red-500">{errors.recipe.message}</p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current Image Link: </span>
            </label>
            <input
              type="url"
              defaultValue={image}
              readOnly
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />{" "}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Add New Image</span>
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

          <div className="form-control mt-6  self-start  ">
            <button className="btn  bg-[#e7a043] hover:bg-blue-500  text-lg text-white ">
              UPDATE ITEM <FaUtensils></FaUtensils>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
