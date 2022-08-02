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
    <div className="landing flex flex-col overflow-x-hidden w-full">
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col swiper items-center justify-between">
          {/* <Image
            className="rounded-lg sm:w-3/6 border border-black "
            src={landingImage}
            layout="intrinsic"
            width={700}
            height={300}
          /> */}

          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            className="flex flex-col items-center"
          >
            <SwiperSlide>
              <Image
                className="rounded-lg sm:w-3/6 border border-black"
                src={landingImage}
                layout="intrinsic"
                width={700}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="rounded-lg sm:w-3/6 border border-black"
                src={birthday}
                layout="intrinsic"
                width={700}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="rounded-lg sm:w-3/6 border border-black"
                src={graduation}
                layout="intrinsic"
                width={700}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                className="rounded-lg sm:w-3/6 border border-black"
                src={brakefast}
                layout="intrinsic"
                width={700}
                height={300}
              />
            </SwiperSlide>
          </Swiper>

          <MdOutlineSwipe className="my-10 animate-ping text-xl" />
        </div>
        <h1 className="sm:m-7 md:w-5/6 text">
          Whether you love the simplicity of a banana or the taste of icing
          we’ve got sweet treats for every craving!
        </h1>
      </div>
    </div>
  );
}

export default Landing;
