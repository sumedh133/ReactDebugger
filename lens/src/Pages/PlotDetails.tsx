import "swiper/css";
import "swiper/css/pagination";
import samplePlot from "../assets/plot.png";

interface PlotDetailsProp {
  openModal: () => void;
}

const plotData = [
  {
    config: "1200 sq.ft",
    price: "₹ 69 lakhs onwards*",
  },
  {
    config: "1500 sq.ft",
    price: "₹ 86 sq.ft onwards*",
  },
  {
    config: "2040 sq.ft",
    price: "₹ 1.2 Cr onwards*",
  },
];


export default function PlotDetailsPage({ openModal }: PlotDetailsProp) {
  return (
    <div id="floorplan" className="bg-[#f2fbe7] w-full py-10 px-10 flex flex-col items-center md:items-start z-10 scroll-mt-16">
      {/* Section Heading */}
      <h2 className="text-[#26650B] font-semibold text-base md:text-xl border-3 border-[#26650B] px-8 py-1 mx-10 rounded-full mb-6">
        PLOT DETAILS
      </h2>

      {/* Layout Container */}
      <div className="flex flex-col md:flex-row items-start md:justify-between w-full md:px-16 gap-10">
        {/* Plot Options */}
        <div className="flex flex-col text-center md:text-start space-y-6 md:space-y-10 w-full md:w-[50%]">
          {plotData.map((plot, index) => (
            <PlotCard key={index} plot={plot} />
          ))}
        </div>

        {/* Image on the Right with Button */}
        <div className="relative w-full  flex justify-center">
          <div className="relative w-full max-h-[400px] aspect-square rounded-[50px] overflow-hidden border-2 border-[#26650B]">
            <img
              src={samplePlot}
              alt="plot"
              className="w-full h-full object-cover blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={openModal}
                className="bg-[#26650B] text-white text-sm px-5 py-2 rounded-lg font-medium cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                Get Plot Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

// PlotCard Component
const PlotCard = ({ plot }: { plot: { config: string; price: string } }) => (
  <div>
    <p className="text-[#26650B] text-base md:text-xl font-medium mb-1 md:py-5">
      Configuration type: <span className="font-bold">{plot.config}</span>
    </p>
    <p className="text-[#26650B] text-base md:text-xl font-medium">
      Price: <span className="font-bold">{plot.price}</span>
    </p>
  </div>
);
