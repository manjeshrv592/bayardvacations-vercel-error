"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { BsSliders } from "react-icons/bs";
import { X } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Container from "@/components/ui/Container";
import { usePackages } from "@/contexts/PackageContext";
import PackageCard from "@/components/ui/PackageCard";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactSection } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getRegionDocumentBySlug } from "@/utils/firebase";

const PackagesPage = () => {
  const [range, setRange] = useState([0, 1000000]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(""); // State for sorting
  const [filterMenu, setFilterMenu] = useState(false);
  const [regionDescription, setRegionDescription] = useState("");
  const itemsPerPage = 9;
  const params = useParams();
  const placeName = params.slug;

  useEffect(() => {
    const getDescription = async () => {
      const response = await getRegionDocumentBySlug(placeName);
      setRegionDescription(response.description);
    };

    getDescription();
  }, [placeName]);

  const { packages: allPackages } = usePackages();

  const allThemes = [
    "elite-escape",
    "solo-expedition",
    "family-funventure",
    "group-adventures",
    "religious-retreat",
    "relax-rejuvenate",
    "exploration-bundle",
    "educational",
    "romantic-getaways",
  ];

  const filteredArray = useMemo(() => {
    let result = allPackages.filter((item) => {
      const matchesRegion = placeName ? item.region === placeName : true;
      const isPriceInRange =
        item.basePrice >= range[0] && item.basePrice <= range[1];

      const isDurationSelected =
        selectedDurations.length === 0 ||
        selectedDurations.some((duration) => {
          const [min, max] = duration.split("-").map(Number);
          return (
            item.days >= min && (max ? item.days <= max : item.days >= min)
          );
        });

      const isThemeSelected =
        selectedThemes.length === 0 ||
        selectedThemes.some((theme) => item.theme.includes(theme));

      return (
        matchesRegion && isPriceInRange && isDurationSelected && isThemeSelected
      );
    });

    // Sorting logic
    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "price-low-high":
            return a.basePrice - b.basePrice;
          case "price-high-low":
            return b.basePrice - a.basePrice;
          case "duration-low-high":
            return a.days - b.days;
          case "duration-high-low":
            return b.days - a.days;
          default:
            return 0;
        }
      });
    }

    return result;
  }, [
    allPackages,
    placeName,
    range,
    selectedDurations,
    selectedThemes,
    sortOption,
  ]);

  const paginatedArray = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredArray.slice(startIndex, endIndex);
  }, [filteredArray, currentPage]);

  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);

  const handleSliderChange = (values) => setRange(values);
  const handleMinInputChange = (e) =>
    setRange([Math.min(Number(e.target.value), range[1] - 1000), range[1]]);
  const handleMaxInputChange = (e) =>
    setRange([range[0], Math.max(Number(e.target.value), range[0] + 10000)]);

  const handleDurationChange = (value, checked) =>
    setSelectedDurations((prev) =>
      checked ? [...prev, value] : prev.filter((d) => d !== value)
    );

  const handleThemeChange = (value, checked) =>
    setSelectedThemes((prev) =>
      checked ? [...prev, value] : prev.filter((t) => t !== value)
    );

  const handleSortChange = (value) => setSortOption(value);

  // Reset all filters and pagination
  const handleReset = () => {
    setRange([0, 1000000]);
    setSelectedDurations([]);
    setSelectedThemes([]);
    setCurrentPage(1);
    setSortOption("");
  };

  const handleOpenFilterMenu = () => {
    setFilterMenu(true);
  };

  const handleCloseFilterMenu = () => {
    setFilterMenu(false);
  };

  return (
    <>
      <section className="relative bg-brand-blue pb-16 pt-32 text-white">
        <div className="pattern-bg absolute inset-0 z-10 opacity-5"></div>
        <Container className="relative z-20">
          <h1 className="mb-4 text-4xl font-bold capitalize lg:text-6xl">
            {placeName}
          </h1>
          <p className="inline-block max-w-screen-c-sm border-b-2 border-brand-green pb-1 font-bold capitalize">
            {regionDescription && regionDescription}
          </p>
        </Container>
      </section>

      <section className="py-8 lg:py-16">
        <Container>
          <div>
            <div className="gap-20 c-xl:grid c-xl:grid-cols-[240px_1fr]">
              <div
                className={cn(
                  "absolute -left-full top-[64px] z-20 flex h-[calc(100vh-64px)] w-full flex-col gap-8 c-xl:gap-16 overflow-y-scroll bg-white p-8 transition-all duration-500 c-xl:relative c-xl:left-auto c-xl:top-auto c-xl:h-auto c-xl:p-0 c-xl:overflow-y-auto",
                  {
                    "left-0": filterMenu,
                  }
                )}
              >
                <div className="flex items-center justify-between ">
                  <h4 className="font-bold text-[#383838]">Filter By</h4>
                  <Button
                    className="c-xl:hidden"
                    onClick={handleCloseFilterMenu}
                  >
                    <X />
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="hidden rounded-none border-b border-current bg-transparent !p-0 text-base font-bold text-[#383838] opacity-70 transition-all duration-300 hover:bg-transparent hover:opacity-100 c-xl:inline-block"
                  >
                    Reset All
                  </Button>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-[#383838]">
                    Price Range Per Person
                  </h4>

                  <div className=" mb-4 flex items-center gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#383838]">
                        Min
                      </span>
                      <Input
                        type="number"
                        value={range[0]}
                        onChange={handleMinInputChange}
                        className="w-full text-sm "
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#383838]">
                        Max
                      </span>
                      <Input
                        type="number"
                        value={range[1]}
                        onChange={handleMaxInputChange}
                        className="w-full text-sm"
                      />
                    </div>
                  </div>
                  <Slider
                    value={range}
                    onValueChange={handleSliderChange}
                    max={1000000}
                    step={10000}
                    className="w-full"
                  />
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-[#383838]">Duration</h4>
                  <div className="grid gap-2">
                    {["0-3", "4-5", "6-9", "10+"].map((duration) => (
                      <div key={duration} className="flex items-center gap-2">
                        <Checkbox
                          id={`duration-${duration}`}
                          value={duration}
                          checked={selectedDurations.includes(duration)}
                          onCheckedChange={(checked) =>
                            handleDurationChange(duration, checked)
                          }
                        />
                        <label htmlFor={`duration-${duration}`}>
                          {duration.replace("-", " - ")} Days
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-bold text-[#383838]">Themes</h4>
                  <div className="grid gap-2">
                    {allThemes.map((theme) => (
                      <div key={theme} className="flex items-center gap-2">
                        <Checkbox
                          id={`theme-${theme}`}
                          value={theme}
                          checked={selectedThemes.includes(theme)}
                          onCheckedChange={(checked) =>
                            handleThemeChange(theme, checked)
                          }
                        />
                        <label htmlFor={`theme-${theme}`}>
                          {theme.replace(/-/g, " ")}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <ContactSection />

                <div className="space-y-4 c-xl:hidden">
                  <Button onClick={handleReset} className="w-full">
                    Reset
                  </Button>
                  <Button onClick={handleCloseFilterMenu} className="w-full">
                    Done
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-between pb-8 c-xl:justify-end">
                  <Button
                    variant={"outline"}
                    onClick={handleOpenFilterMenu}
                    className="flex gap-2 border border-solid border-[#a3a3a3] c-xl:hidden"
                  >
                    <span>Filter</span>
                    <BsSliders className="!size-3" />
                  </Button>

                  <div className="items-center gap-4 c-xl:flex">
                    <h4 className="hidden font-bold text-[#6B6B6B] c-xl:inline-block">
                      Sort By:
                    </h4>
                    <Select onValueChange={handleSortChange}>
                      <SelectTrigger className="w-[120px] c-xl:w-[180px]">
                        <SelectValue placeholder="Relevance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Relevance</SelectLabel>
                          <SelectItem value="price-low-high">
                            Price (Low to High)
                          </SelectItem>
                          <SelectItem value="price-high-low">
                            Price (High to Low)
                          </SelectItem>
                          <SelectItem value="duration-low-high">
                            Duration (Low to High)
                          </SelectItem>
                          <SelectItem value="duration-high-low">
                            Duration (High to Low)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid content-start gap-8 c-md:grid-cols-2 c-xxl:grid-cols-3">
                  {paginatedArray.map((item) => (
                    <PackageCard
                      key={item.id}
                      item={item}
                      className="hoverable-card"
                    />
                  ))}
                </div>
                <div className="flex justify-center py-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-green text-white hover:bg-brand-green-hovered hover:text-white"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            className={cn(_, {
                              "cursor-pointer": currentPage !== index + 1,
                              "text-neutral-600 underline":
                                currentPage === index + 1,
                            })}
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-brand-green text-white hover:bg-brand-green-hovered hover:text-white"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PackagesPage;
