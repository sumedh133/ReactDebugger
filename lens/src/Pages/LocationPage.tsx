import locationMap from "../assets/Loaction.svg";
import flowers from "../assets/flowers.svg";
import lines from "../assets/homepage-lines.svg";

export default function LocationSection() {
  return (
    <div id="location" className="flex flex-col-reverse md:flex-row md:items-start justify-between pt-8 md:py-10 bg-white md:relative md:z-0 scroll-mt-26 overflow-hidden">
      {/* Map Image - bottom on mobile, left on md+ */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 px-5 md:px-10">
        <img src={locationMap} alt="Location Map" className="w-full h-auto" />
      </div>

      <img
        src={lines}
        alt="decoline"
        className="lg:w-165 lg:absolute lg:-top-50 lg:right-0 lg:-z-3 hidden lg:block lg:rotate-180"
      />

      {/* Text Content - top on mobile, right on md+ */}
      <div className="w-full md:w-1/2 flex flex-col self-start text-center md:text-left px-5 md:px-10 md:z-1 md:bg-white md:py-5">
        <h2 className="text-[#26650B] text-2xl md:text-3xl xl:text-4xl font-bold mb-4 leading-tight md:font-semibold text-left">
          LOCATION FOR EVERY <br className="md:hidden " /> ASPECT OF YOUR
          LIFE
        </h2>

        <img
          src={flowers}
          alt="flowers"
          className="w-[78px] h-[26px] md:h-[42px] md:w-[125px] mb-4"
        />

        <p className="text-black text-sm md:text-base xl:text-lg mb-4 max-w-[500px] text-left">
          Located in East Bengaluru - Malur offers easy connectivity with Tamil
          Nadu and Andhra Pradesh via the Satellite Town Ring Road (STRR) and
          the Bengaluru Chennai Expressway. Malur also offers easy access to the
          Bengaluru Airport region - which is an upcoming hub for several IT
          companies.
        </p>

        <a href="https://www.google.com/maps/place/Malur,+Karnataka/@12.999567,77.941132,13577m/data=!3m1!1e3!4m6!3m5!1s0x3bade20db2d3a483:0xd4afd03a7706e592!8m2!3d13.0037225!4d77.9383033!16zL20vMDd2Mjc2?hl=en&entry=ttu&g_ep=EgoyMDI1MDYyMy4yIKXMDSoASAFQAw%3D%3D">
        <button className="self-start inline-flex px-6 py-1.5 border-2 border-[#26650B] text-black font-semibold rounded-full transition-all text-sm hover:bg-[#26650B] hover:text-white md:py-3 md:px-7 md:text-sm cursor-pointer" >
          Open in Google Maps
        </button>
        </a>
      </div>
    </div>
  );
}
