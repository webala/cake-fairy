import Image from "next/image";
import landingImage from "../public/breads.jpg";
import birthday from "../public/birthday.jpg";
import brakefast from "../public/brakefast.jpg";
import disert from "../public/disert.jpg";
import graduation from "../public/graduation.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function Landing() {
  return (
    <div className="landing flex flex-col overflow-x-hidden">
      <div className="flex flex-col justify-between items-center md:flex-row">
        <Image
          className="rounded-lg sm:w-3/6 border border-black sm:invisible"
          src={landingImage}
          layout="intrinsic"
          width={700}
          height={300}
        />
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          className="invisible sm:visible"
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

        <h1 className="sm:m-7 md:w-5/6 text">
          Whether you love the simplicity of a banana or the taste of icing
          we’ve got sweet treats for every craving!
        </h1>
      </div>
    </div>
  );
}

export default Landing;
