import SectionTitle from "../../components/SectionTitle/SectionTitle";
import FeaturedImg from "../../assets/home/featured.jpg";
import "./featured.css";

const Featured = () => {
  return (
    <div className="p-20 featured bg-fixed bg-black bg-opacity-40 bg-blend-overlay text-white  mb-8 lg:mb-16">
      <SectionTitle
        heading="FROM OUR MENU"
        subHeading="Check it out"
      ></SectionTitle>
      <div className="flex gap-10">
        <div>
          <img src={FeaturedImg} alt="" />
        </div>
        <div className="flex flex-col items-start justify-center space-y-8">
          <h3 className="text-xl font-medium">March 20, 2023</h3>
          <h1 className="text-3xl font-semibold">WHERE CAN I GET SOME?</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur
          </p>
          <button className="btn bg-transparent text-white hover:bg-transparent hover:border-b-4 border-0 hover:outline hover:outline-lime-50 hover:outline-1  border-white border-b-4">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
