import React from "react";
import phoneIcon from "../assets/phone.svg";

interface FooterProps {
  openModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ openModal }) => {
  return (
    <div className="bg-[#F2FFED] w-full md:relative md:pt-10">
      {/* Heading */}
      <div className="flex flex-col items-center px-6 py-10 md:px-20 md:py-16 md:pb-30">
        <h2 className="text-[#26650B] font-bold text-2xl md:text-4xl mb-4 md:mb-6">
          GET IN TOUCH
        </h2>

        {/* Decorative line with dots */}
        <div className="relative w-full md:max-w-110 max-w-55 h-[1px] bg-[#60A44C] mb-8 md:mb-10">
          <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60A44C] rounded-full" />
          <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#60A44C] rounded-full" />
        </div>

        {/* Button */}
        <button
          onClick={openModal} // Call openModal on click
          className="bg-black text-white text-lg md:text-base font-semibold px-12 py-3 md:px-16 md:py-2 rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          Fill the form
        </button>
      </div>

      {/* Green Call Banner */}
      <a
        href="tel:+918123130034"
        className="bg-[#26650B] py-5 px-6 md:py-3 flex items-center justify-center md:justify-end gap-3 md:gap-5 md:absolute md:top-10 md:right-0 md:w-auto cursor-pointer"
      >
        <div className="rounded-full">
          <img src={phoneIcon} alt="Phone" className="w-7 h-7 md:w-8 md:h-8" />
        </div>
        <span className="text-white font-semibold text-lg md:text-2xl text-center">
          +91 8123130034
        </span>
      </a>

      {/* Bottom Bar */}
      <div className="bg-black md:bg-[#26650B] text-white py-3 md:py-5 text-[10px] text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 md:justify-center md:gap-10">
          <span className="underline text-xs md:text-sm md:pr-40">
            PRIVACY POLICY
          </span>
          <span className="text-[8px] md:text-xs md:font-semibold leading-snug sm:leading-normal sm:max-w-[80%] md:max-w-[60%] text-center md:text-center">
            Disclaimer: This website is not an official site; it belongs to the
            authorized channel partner and is for informational purposes only.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
