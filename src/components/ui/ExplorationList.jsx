"use client";
import React from "react";
import ExplorationCard from "@/components/ui/ExplorationCard";
import { usePackages } from "@/contexts/PackageContext";

const ExplorationList = ({ theme }) => {
  const { packages, isDomestic } = usePackages();

  const themePackages = packages
    .filter((pkg) => pkg.theme.includes(theme))
    .filter((pkg) => pkg.domestic === isDomestic);

  const uniqueRegions = themePackages.reduce((acc, current) => {
    const isRegionPresent = acc.some((item) => item.region === current.region);
    if (!isRegionPresent) {
      acc.push(current);
    }
    return acc;
  }, []);

  if (
    packages.length === 0 ||
    themePackages.length === 0 ||
    uniqueRegions.length === 0
  ) {
    return <h3>No packages found</h3>;
  }

  return (
    <>
      {uniqueRegions.map((item) => (
        <ExplorationCard key={item.id} item={item} />
      ))}
    </>
  );
};

export default ExplorationList;
