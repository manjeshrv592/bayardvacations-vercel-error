"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "@/components/ui/Container";
import { H3 } from "@/components/Typography";
import { Accordion } from "@/components/ui/accordion";

import WaveAnimation from "@/components/ui/WaveAnimation";
import BookNowForm from "@/components/BookNowForm";
import PackageIncludes from "@/components/PackageIncludes";
import PackageExcludes from "@/components/PackageExcludes";
import { useParams } from "next/navigation";
import { getPackageWithReferences } from "@/utils/firebase";
import ItineraryHeader from "@/components/Itinerary/ItineraryHeader";
import ItineraryHeroDesktop from "@/components/Itinerary/ItineraryHeroDesktop";
import ItineraryHeroMobile from "@/components/Itinerary/ItineraryHeroMobile";
import ItineraryFooter from "@/components/Itinerary/ItineraryFooter";
import ItineraryAccordionItem from "@/components/Itinerary/ItineraryAccordionItem";
import { usePackages } from "@/contexts/PackageContext";
import WebsiteLoader from "@/components/ui/WebsiteLoader";
import Image from "next/image";
import ItineraryHotelDetails from "@/components/Itinerary/ItineraryHotelDetails";

const splitStringToArray = (inputString) => {
  return inputString.split("-");
};

const themeMapData = [
  {
    themeSlug: "elite-escape",
    themeText: "Elite Escape",
    icon: "/icons-filled/elite-escape.svg",
  },
  {
    themeSlug: "solo-expedition",
    themeText: "Solo Expedition",
    icon: "/icons-filled/solo-expedition.svg",
  },
  {
    themeSlug: "family-funventure",
    themeText: "Family Funventure",
    icon: "/icons-filled/family-funventure.svg",
  },
  {
    themeSlug: "group-adventures",
    themeText: "Group Adventures",
    icon: "/icons-filled/group-adventures.svg",
  },
  {
    themeSlug: "religious-retreat",
    themeText: "Religious Retreat",
    icon: "/icons-filled/religious-retreat.svg",
  },
  {
    themeSlug: "relax-rejuvenate",
    themeText: "Relax & Rejuvenate",
    icon: "/icons-filled/relax-rejuvenate.svg",
  },
  {
    themeSlug: "exploration-bundle",
    themeText: "Exploration Bundle",
    icon: "/icons-filled/exploration-bundle.svg",
  },
  {
    themeSlug: "educational",
    themeText: "Educational",
    icon: "/icons-filled/educational.svg",
  },
  {
    themeSlug: "romantic-getaways",
    themeText: "Romantic Getaways",
    icon: "/icons-filled/romantic-getaways.svg",
  },
];

const SinglePackagePage = () => {
  const params = useParams();
  const slug = params.packages;
  const [activeItem, setActiveItem] = useState("");
  const { packages: allPackages } = usePackages();
  const [packageData, setPackageData] = useState(null);
  const relatedPackages = allPackages?.filter(
    (item) =>
      item.region === packageData?.region &&
      item.packageSlug !== packageData?.packageSlug
  );

  const handleValueChange = (value) => {
    setActiveItem(value);
    // Update URL hash
    if (value) {
      window.location.hash = value;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getPackageWithReferences(slug);

        setPackageData(response);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
    // eslint-disable-next-line
  }, []);

  if (packageData === null) {
    return <WebsiteLoader />;
  }

  const cities = splitStringToArray(packageData?.citiesList);
  const themes = packageData?.theme;
  const themesBelongsTo = themeMapData.filter((theme) =>
    themes.includes(theme.themeSlug)
  );

  return (
    <>
      <ItineraryHeader packageData={packageData} />
      <ItineraryHeroDesktop packageData={packageData} />
      <ItineraryHeroMobile packageData={packageData} />
      {/* Main content start */}
      <section className="min-h-screen">
        <Container className="">
          <div className="relative grid min-h-screen gap-8 c-xxl:grid-cols-[1fr_400px]">
            <div className="relative">
              <div className="mb-16 text-brand-blue">
                <div className="mb-8">
                  <H3 className=" mb-1 text-brand-blue">Theme</H3>
                  <span>
                    <Image
                      src="/green-line.svg"
                      alt="Line"
                      width={130}
                      height={19}
                    />
                  </span>
                </div>
                <span className="flex flex-wrap items-center gap-8">
                  {themesBelongsTo.length > 0 &&
                    themesBelongsTo.map((item, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 rounded-lg border border-[#E4E4E4] bg-[#F8F8F8] px-4 pl-2 capitalize"
                      >
                        <Image
                          width={32}
                          height={32}
                          src={item.icon}
                          alt={item.themeText}
                        />
                        {item.themeText}
                      </span>
                    ))}
                </span>
              </div>
              <div className="mb-16 text-brand-blue">
                <div className="mb-8">
                  <H3 className="mb-1 text-brand-blue">Locations covered</H3>
                  <span>
                    <Image
                      src="/green-line.svg"
                      alt="Line"
                      width={130}
                      height={19}
                    />
                  </span>
                </div>
                <span className="flex flex-wrap items-center gap-4">
                  {cities.length > 0 &&
                    cities.map((item, i) => (
                      <span
                        key={i}
                        className="inline-block rounded-full border-2 border-solid border-[#59DF02] px-4 py-1 capitalize"
                      >
                        {item}
                      </span>
                    ))}
                </span>
              </div>

              {/* Package Itinerary start */}
              <div className="mb-10">
                <div className="mb-8">
                  <H3 className="mb-1 text-brand-blue">Itinerary</H3>
                  <span>
                    <Image
                      src="/green-line.svg"
                      alt="Line"
                      width={130}
                      height={19}
                    />
                  </span>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  className="space-y-5"
                  value={activeItem}
                  onValueChange={handleValueChange}
                >
                  {packageData?.itineraries.map((itinerary, index) => (
                    <ItineraryAccordionItem
                      itinerary={itinerary}
                      index={index}
                      key={uuidv4()}
                      value={activeItem}
                    />
                  ))}
                </Accordion>
              </div>
              {/* Package Itinerary end */}

              <div className="mb-8">
                <ItineraryHotelDetails details={packageData?.hotelDetails} />
              </div>

              <PackageIncludes includes={packageData.includes} />
              <PackageExcludes
                excludes={packageData.excludes}
                className="mb-16"
              />
              <WaveAnimation packageData={packageData} />
            </div>

            <div className="sticky top-12 h-fit">
              <BookNowForm packageData={packageData} />
            </div>
          </div>
        </Container>
      </section>
      {/* Main content end */}
      {relatedPackages && <ItineraryFooter relatedPackages={relatedPackages} />}
    </>
  );
};

export default SinglePackagePage;
