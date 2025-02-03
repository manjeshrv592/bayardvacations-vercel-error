// hooks/useFirebaseSearch.js
"use client";

import { db } from "@/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";

export function useFirebaseSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const searchPackages = async (searchTerm) => {
    setIsLoading(true);
    try {
      console.log("Searching for:", searchTerm);

      const searchTermLower = searchTerm.toLowerCase();

      // Query BasePackages
      const basePackagesRef = collection(db, "BasePackages");
      const basePackagesQuery = query(basePackagesRef);

      // Query ChildPackages
      const childPackagesRef = collection(db, "ChildPackages");
      const childPackagesQuery = query(
        childPackagesRef,
        where("status", "in", ["published", "Published"])
      );

      const [basePackagesSnap, childPackagesSnap] = await Promise.all([
        getDocs(basePackagesQuery),
        getDocs(childPackagesQuery),
      ]);

      console.log(
        "Base Packages Raw:",
        basePackagesSnap.docs.map((doc) => doc.data())
      );

      const basePackages = basePackagesSnap.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.basePackage,
            type: "base",
            slug: data.basePackage.toLowerCase().replace(/\s+/g, "-"), // For base packages
            travelType: data.travelType,
          };
        })
        .filter((pkg) => pkg.name.toLowerCase().includes(searchTermLower));

      const childPackages = childPackagesSnap.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.childPackageName,
            type: "child",
            slug: data.slug, // For child packages
            price: data.price,
            days: data.days,
            nights: data.nights,
          };
        })
        .filter((pkg) => pkg.name.toLowerCase().includes(searchTermLower));

      const finalResults = [...basePackages, ...childPackages];
      console.log("Final Results:", finalResults);

      setResults(finalResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { searchPackages, results, isLoading };
}
