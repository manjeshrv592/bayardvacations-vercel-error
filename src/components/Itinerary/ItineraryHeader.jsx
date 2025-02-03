import React from "react";
// import Container from "../ui/Container";

const ItineraryHeader = ({ packageData }) => {
  return (
    <section className="absolute mb-[-150px] min-h-[60vh] w-full bg-brand-blue pb-7 pt-20 text-white">
      <div className="pattern-bg absolute inset-0 z-10 opacity-5"></div>
      {/* <Container className="relative z-20">
        <div className="flex flex-col items-start gap-2 c-lg:flex-row c-lg:items-center c-lg:justify-between">
          <h1 className="max-w-screen-c-md text-2xl  font-bold leading-[130%] c-xl:text-5xl">
            {packageData?.packageTitle}
          </h1>
          <div className="shrink-0 rounded-lg bg-brand-green px-4 py-2 text-white">
            <h4 className="font-semibold c-lg:hidden">
              {packageData?.days} Days & {packageData?.nights} Nights
            </h4>
            <h4 className="hidden text-xl font-semibold c-lg:block">
              {packageData?.days} Days & <br /> {packageData?.nights} Nights
            </h4>
          </div>
        </div>
      </Container> */}
    </section>
  );
};

export default ItineraryHeader;
