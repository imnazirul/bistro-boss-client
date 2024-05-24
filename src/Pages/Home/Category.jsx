import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

import Slide1 from "../../assets/home/slide1.jpg";
import Slide2 from "../../assets/home/slide2.jpg";
import Slide3 from "../../assets/home/slide3.jpg";
import Slide4 from "../../assets/home/slide4.jpg";
import Slide5 from "../../assets/home/slide5.jpg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <>
      <SectionTitle
        subHeading="From 11:00am to 10:00pm"
        heading="Order Online"
      ></SectionTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper mb-8 md:mb-16"
      >
        <SwiperSlide>
          <img src={Slide1} alt="" />
          <h3 className="text-4xl text-center text-white font-semibold drop-shadow-2xl uppercase -mt-16">
            Salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide2} alt="" />
          <h3 className="text-4xl text-center text-white font-semibold drop-shadow-2xl uppercase -mt-16">
            Soups
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide3} alt="" />
          <h3 className="text-4xl text-center text-white font-semibold drop-shadow-2xl uppercase -mt-16">
            Pizzas
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide4} alt="" />
          <h3 className="text-4xl text-center text-white font-semibold drop-shadow-2xl uppercase -mt-16">
            Deserts
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Slide5} alt="" />
          <h3 className="text-4xl text-center text-white font-semibold drop-shadow-2xl uppercase -mt-16 pb-4">
            Salads
          </h3>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Category;
