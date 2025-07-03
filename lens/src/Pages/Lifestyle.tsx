import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import lines from "../assets/lifestyle-lines.svg";
import "swiper/css";
import "swiper/css/pagination";

import image1 from "../assets/image1.svg";
import image2 from "../assets/image2.svg";
import image3 from "../assets/image3.svg";
import image4 from "../assets/image4.svg";

const images = [image1, image2, image3, image4];

function LifestylePage() {
  return (
    <>
      <div id="gallery" className="bg-white w-full md:mb-10 mb-6 md:relative md:-z-1 scroll-mt-16">
        <p className="md:pl-60 md:pt-10 pt-6 text-2xl text-left font-bold text-[#26650B] mb-6 md:mb-12 px-6 md:px-0 -z-1">
          A 360° LIFESTYLE
        </p>
        <img
          src={lines}
          alt="decoline"
          className="lg:w-150 lg:absolute md:-top-3 lg:left-50 hidden lg:block lg:-z-3"
        />

        {/* Mobile view - Swiper */}
        <div className="block md:hidden px-4">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="pb-2 flex flex-col items-center"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center">
                  <img
                    src={img}
                    alt={`Image ${index + 1}`}
                    className={`w-full h-auto mb-8 ${
                      index === 0 ? "rounded-tl-[80px]" : ""
                    }`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop view - Grid */}
        <div className="hidden md:flex flex-col items-center gap-4">
          <div className="flex justify-center gap-4">
            <img
              src={image1}
              alt="Image 1"
              className="w-100 rounded-tl-[80px] h-auto "
            />
            <img src={image2} alt="Image 2" className="w-100 h-auto " />
          </div>
          <div className="flex justify-center gap-4">
            <img src={image3} alt="Image 3" className="w-100 h-auto" />
            <img src={image4} alt="Image 4" className="w-100 h-auto" />
          </div>
        </div>
      </div>

      {/* Custom Swiper pagination styling */}
      <style>{`
        .swiper-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background-color: rgb(123, 123, 121);
          opacity: 0.5;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: rgb(56, 57, 56);
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </>
  );
}

export default LifestylePage;
