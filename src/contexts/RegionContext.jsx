"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllDocuments } from "@/utils/firebase";

const RegionContext = createContext();

const continents = [
  { feKey: "asia", displayName: "Asia", regions: [] },
  { feKey: "africa", displayName: "Africa", regions: [] },
  { feKey: "north_america", displayName: "North America", regions: [] },
  { feKey: "south_america", displayName: "South America", regions: [] },
  { feKey: "europe", displayName: "Europe", regions: [] },
  { feKey: "oceania", displayName: "Oceania", regions: [] },
];

export function RegionProvider({ children }) {
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter domestic regions
  const domesticRegions = regions.filter((item) => item.isDomestic);

  // Group international regions by continent
  const internationalRegions = regions
    .filter((item) => !item.isDomestic)
    .reduce(
      (acc, region) => {
        // Find the corresponding continent
        const continentIndex = acc.findIndex(
          (continent) => continent.feKey === region.continent
        );

        if (continentIndex !== -1) {
          // Add region to existing continent
          acc[continentIndex].regions.push(region);
        }

        return acc;
      },
      JSON.parse(JSON.stringify(continents))
    ); // Deep clone continents array

  useEffect(() => {
    const fetchRegions = async () => {
      setIsLoading(true);
      try {
        const regions = await getAllDocuments("regions");
        setRegions(regions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return (
    <RegionContext.Provider
      value={{
        regions,
        domesticRegions,
        internationalRegions,
        regionIsLoading: isLoading,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegions() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegions must be used within a RegionProvider");
  }
  return context;
}
