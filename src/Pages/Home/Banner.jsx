import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Img1 from "../../assets/home/01.jpg";
import Img2 from "../../assets/home/02.jpg";
import Img3 from "../../assets/home/03.png";
import Img4 from "../../assets/home/04.jpg";
import Img5 from "../../assets/home/05.png";
import Img6 from "../../assets/home/06.png";

const Banner = () => {
  return (
    <>
      <Carousel autoPlay={true} interval={3000} infiniteLoop={true}>
        <div>
          <img src={Img1} />
        </div>
        <div>
          <img src={Img2} />
        </div>
        <div>
          <img src={Img3} />
        </div>
        <div>
          <img src={Img4} />
        </div>
        <div>
          <img src={Img5} />
        </div>
        <div>
          <img src={Img6} />
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
