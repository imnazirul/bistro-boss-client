import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useEffect, useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div>
      <SectionTitle
        heading="TESTIMONIALS"
        subHeading="What Our Clients Say"
      ></SectionTitle>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide className="space-y-8 p-10 " key={review._id}>
              <div>
                {" "}
                <ReactStarsRating
                  className="flex gap-2 justify-center"
                  value={review.rating}
                  isEdit={false}
                ></ReactStarsRating>
              </div>
              <p className="text-center px-4">{review.details}</p>
              <h1 className="text-yellow-400 text-lg font-semibold text-center">
                {review.name}
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
