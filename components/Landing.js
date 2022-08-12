import Image from "next/image";
import { MdOutlineSwipe } from "react-icons/md";
import landingImage from "../public/breads.jpg";
import birthday from "../public/birthday.jpg";
import brakefast from "../public/brakefast.jpg";
import disert from "../public/disert.jpg";
import graduation from "../public/graduation.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function Landing() {
  return (
    <div className="landing flex flex-col overflow-x-hidden w-screen">
      <div className="flex flex-col justify-between items-center w-full">
        <div className="flex flex-col swiper items-center justify-between">
          <Image
            className="rounded-lg sm:w-full border border-black "
            src={landingImage}
            layout="intrinsic"
            width={700}
            height={300}
          />
        </div>
        <h1 className="sm:p-7 md:w-5/6 text">
          Whether you love the simplicity of a banana or the taste of icing
          we’ve got sweet treats for every craving!
        </h1>
      </div>
    </div>
  );
}

export default Landing;
