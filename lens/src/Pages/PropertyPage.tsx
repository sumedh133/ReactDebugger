import propertyImage from "../assets/Property.svg";
import flowers from "../assets/flowers.svg";
import lines from "../assets/homepage-lines.svg";

interface PropertyPageProps {
  openModal: () => void;
}

export default function PropertyPage({ openModal }: PropertyPageProps) {
  return (
    <div id="overview" className="scroll-mt-24 w-full bg-white overflow-hidden md:py-14 md:relative md:z-0 ">
      <div className="flex flex-col md:flex-row items-start mx-auto md:z-1">
        <img
          src={lines}
          alt="decoline"
          className="lg:w-150 lg:absolute lg:-left-100 lg:bottom-20 hidden lg:block lg:scale-x-[-1] rotate-180"
        />

        {/* Text Section */}
        <div className="flex flex-col justify-start px-5 pt-6 md:pb-10 pb-16 text-left md:pl-14 md:pr-14 md:pt-0 md:w-1/2 md:z-1 md:bg-white">
          <h2 className="text-[#26650B] text-2xl leading-snug font-bold mb-4 md:text-3xl">
            A BLEND OF LUXURY AND <br /> LIFESTYLE
          </h2>

          <p className="text-sm text-black mb-3 md:text-lg">
            Brigade Plots Malur is a premium plotted development in East
            Bengaluru, offering spacious residential plots amidst greenery.
            Enjoy suburban tranquility, great connectivity, and the promise of
            appreciation—crafted by the trusted Brigade Group for your dream
            home and future investment.
          </p>

          <button
            onClick={openModal} // Open the modal when clicked
            className="bg-black text-sm text-white font-semibold px-10 py-2 rounded-lg w-fit mb-4 md:px-16 cursor-pointer transition-transform duration-300 hover:scale-105"
          >
            Enquire Now
          </button>

          <img
            src={flowers}
            alt="flowers"
            className="w-[78px] h-[26px] md:h-[42px] md:w-[125px]"
          />
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-end items-start md:pr-0">
          <img
            src={propertyImage}
            alt="Brigade Property"
            className="w-full h-auto md:w-[780px] md:h-[520px] object-cover object-right md:rounded-br-[150px] rounded-br-[70px]"
          />
        </div>
      </div>
    </div>
  );
}
