"use client";
import { createContext, useContext, useState } from "react";
import { getAllPackagesWithReferences } from "@/utils/firebase";

const PackageContext = createContext();

export function PackageProvider({ children }) {
  const [packages, setPackages] = useState([]);
  const [isDomestic, setIsDomestic] = useState(true);

  const handleIsDomestic = () => {
    setIsDomestic((prev) => !prev);
  };

  const domesticPackages = packages?.filter((pkg) => pkg.domestic === true);

  const internationalPackages = packages?.filter(
    (pkg) => pkg.domestic === false
  );

  // const internationalPackages = packages
  //   ?.filter((pkg) => pkg.domestic === false)
  //   .map((pkg) => ({
  //     id: pkg.id,
  //     region: pkg.region,
  //   }));

  async function fetchPackages() {
    try {
      const data = await getAllPackagesWithReferences("packages");
      const publishedPackages = data.filter(
        (item) => item.status === "published"
      );
      setPackages(publishedPackages);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <PackageContext.Provider
      value={{
        packages,
        fetchPackages,
        domesticPackages,
        internationalPackages,
        isDomestic,
        handleIsDomestic,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

export function usePackages() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error("usePackages must be used within a PackageProvider");
  }
  return context;
}
