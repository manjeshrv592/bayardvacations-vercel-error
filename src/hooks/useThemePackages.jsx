// hooks/useThemePackages.js
"use client";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

export function useThemePackages() {
  const getPackagesByTheme = async (theme) => {
    // theme will be "romantic-adventure" or "adventure"
    try {
      const childPackagesRef = collection(db, "ChildPackages");

      // Direct theme match, no string manipulation needed
      const childQuery = query(
        childPackagesRef,
        where("theme", "==", theme),
        where("status", "in", ["published", "Published"])
      );

      const childSnap = await getDocs(childQuery);
      const basePackageIds = Array.from(
        new Set(childSnap.docs.map((doc) => doc.data().basePackageId))
      );

      return basePackageIds;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  return { getPackagesByTheme };
}
