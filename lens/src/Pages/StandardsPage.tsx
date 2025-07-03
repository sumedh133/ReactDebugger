import sports from '../assets/sportsicon.svg'
import landscape from '../assets/Landscapeicon.svg'
import recreational from '../assets/Recreationalicon.svg'
import leisure from '../assets/Leisureicon.svg'
import security from '../assets/securityicon.svg'
import swimming from '../assets/swimmingpoolicon.svg'

const topRow = [
  { name: 'Sports', imgSrc: sports },
  { name: 'Landscape', imgSrc: landscape },
  { name: 'Recreational', imgSrc: recreational },
  { name: 'Leisure', imgSrc: leisure },
]

const bottomRow = [
  { name: 'Security', imgSrc: security },
  { name: 'Swimming Pool', imgSrc: swimming },
]

const StandardsPage = () => {
  return (
    <div id="amenities" className="bg-[#F2FFED] w-full px-6 py-10 scroll-mt-16">
      <h1 className="text-2xl md:text-3xl font-bold text-green-800 text-left mb-10 leading-tight md:px-12 ">
        THE NEW STANDARD IN<br className='md:hidden'/>LUXURY
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-12 justify-items-center md:justify-items-center md:px-60">
        {/* Top row icons */}
        {topRow.map((item) => (
          <div key={item.name} className="flex flex-col items-center space-y-2">
            <div className="w-24 h-28 md:w-34 md:h-40 rounded-full border-2 border-[#D6FFC4] flex items-center justify-center md:border-4">
              <img
                src={item.imgSrc}
                alt={item.name}
                className="w-18 h-18 md:w-26 md:h-26 object-contain"
              />
            </div>
            <span className="text-green-700 font-medium text-center text-sm md:text-base">
              {item.name}
            </span>
          </div>
        ))}

        {/* Bottom row manually placed under column 2 and 3 */}
        <div className="flex flex-col items-center space-y-2 md:col-start-2">
          <div className="w-24 h-28 md:w-34 md:h-40 rounded-full border-2 border-[#D6FFC4] flex items-center justify-center md:border-4">
            <img
              src={bottomRow[0].imgSrc}
              alt={bottomRow[0].name}
              className="w-12 h-12 md:w-20 md:h-20  object-contain"
            />
          </div>
          <span className="text-green-700 font-medium text-center text-sm md:text-base">
            {bottomRow[0].name}
          </span>
        </div>

        <div className="flex flex-col items-center space-y-2 md:col-start-3">
          <div className="w-24 h-28 md:w-34 md:h-40 rounded-full border-2 border-[#D6FFC4] flex items-center justify-center md:border-4">
            <img
              src={bottomRow[1].imgSrc}
              alt={bottomRow[1].name}
              className="w-12 h-12 md:w-20 md:h-20 object-contain"
            />
          </div>
          <span className="text-green-700 font-medium text-center text-sm md:text-base">
            {bottomRow[1].name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StandardsPage;
