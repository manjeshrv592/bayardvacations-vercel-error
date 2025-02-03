import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// Helper function to sanitize document references
const sanitizeDocRef = (item) => {
  // For imageRefs which have a nested ref structure
  if (item?.ref?.type === "document") {
    return {
      id: item.ref._key.path.segments.pop(),
      collection: item.ref._key.path.segments.pop(),
    };
  }
  // For direct document references (like in includes field)
  if (item?.type === "document") {
    return {
      id: item._key.path.segments.pop(),
      collection: item._key.path.segments.pop(),
    };
  }
  return item;
};

// Helper function to sanitize document data
const sanitizeDocumentData = (doc) => {
  const data = doc.data();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      // Check if this is an array of document references or objects containing references
      if (key === "itineraries") {
        data[key] = data[key].map((itinerary) => ({
          ...itinerary,
          imageRefs: itinerary.imageRefs?.map(sanitizeDocRef) || [],
        }));
      }
      // Handle all other array fields (includes, etc.)
      else {
        data[key] = data[key].map(sanitizeDocRef);
      }
    }
  });

  return {
    id: doc.id,
    ...data,
  };
};

// Helper function to fetch referenced document data
const getReferencedData = async (docRef) => {
  try {
    const docSnap = await getDoc(doc(db, docRef.collection, docRef.id));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching referenced document:", error);
    return null;
  }
};

// Add this function to your utils file
export const getAllPackagesWithReferences = async () => {
  try {
    // First get all packages
    const packages = await getAllDocuments("packages");

    // Then fetch references for each package
    const packagesWithRefs = await Promise.all(
      packages.map(async (packageData) => {
        // Fetch includes data if exists
        if (packageData.includes) {
          const includesData = await Promise.all(
            packageData.includes.map(getReferencedData)
          );
          packageData.includes = includesData.filter(Boolean);
        }

        if (packageData.excludes) {
          const excludesData = await Promise.all(
            packageData.excludes.map(getReferencedData)
          );
          packageData.excludes = excludesData.filter(Boolean);
        }

        if (packageData.bannerImages) {
          const bannerImagesData = await Promise.all(
            packageData.bannerImages.map(getReferencedData)
          );
          packageData.bannerImages = bannerImagesData.filter(Boolean);
        }

        if (packageData.cardImages) {
          const cardImagesData = await Promise.all(
            packageData.cardImages.map(getReferencedData)
          );
          packageData.cardImages = cardImagesData.filter(Boolean);
        }

        // Fetch itinerary image data if exists
        if (packageData.itineraries) {
          packageData.itineraries = await Promise.all(
            packageData.itineraries.map(async (itinerary) => {
              if (itinerary.imageRefs) {
                const imageData = await Promise.all(
                  itinerary.imageRefs.map(getReferencedData)
                );
                return {
                  ...itinerary,
                  imageRefs: imageData.filter(Boolean),
                };
              }
              return itinerary;
            })
          );
        }

        return packageData;
      })
    );

    return packagesWithRefs;
  } catch (error) {
    console.error("Error fetching all packages with references:", error);
    throw error;
  }
};

// Get package with all referenced data
export const getPackageWithReferences = async (slug) => {
  try {
    // First get the package document
    const packageData = await getDocumentBySlug(slug);

    // Fetch includes data if exists
    if (packageData.includes) {
      const includesData = await Promise.all(
        packageData.includes.map(getReferencedData)
      );
      packageData.includes = includesData.filter(Boolean);
    }

    if (packageData.excludes) {
      const excludesData = await Promise.all(
        packageData.excludes.map(getReferencedData)
      );
      packageData.excludes = excludesData.filter(Boolean);
    }

    if (packageData.bannerImages) {
      const bannerImagesData = await Promise.all(
        packageData.bannerImages.map(getReferencedData)
      );
      packageData.bannerImages = bannerImagesData.filter(Boolean);
    }

    if (packageData.cardImages) {
      const cardImagesData = await Promise.all(
        packageData.cardImages.map(getReferencedData)
      );
      packageData.cardImages = cardImagesData.filter(Boolean);
    }

    // Fetch itinerary image data if exists
    if (packageData.itineraries) {
      packageData.itineraries = await Promise.all(
        packageData.itineraries.map(async (itinerary) => {
          if (itinerary.imageRefs) {
            const imageData = await Promise.all(
              itinerary.imageRefs.map(getReferencedData)
            );
            return {
              ...itinerary,
              imageRefs: imageData.filter(Boolean),
            };
          }
          return itinerary;
        })
      );
    }

    return packageData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get a single document by slug
export const getDocumentBySlug = async (slug) => {
  try {
    const packagesRef = collection(db, "packages");
    const q = query(packagesRef, where("packageSlug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Package not found");
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};

export const getRegionDocumentBySlug = async (slug) => {
  try {
    const packagesRef = collection(db, "regions");
    const q = query(packagesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Package not found");
    }

    return sanitizeDocumentData(querySnapshot.docs[0]);
  } catch (error) {
    console.error("Error fetching package:", error);
    throw error;
  }
};

// Get all documents
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

// Get documents with query
export const getDocumentsWithQuery = async (collectionName, conditions) => {
  try {
    const collectionRef = collection(db, collectionName);
    const queryConstraints = conditions.map((condition) =>
      where(condition.field, condition.operator, condition.value)
    );

    const q = query(collectionRef, ...queryConstraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching documents with query:", error);
    throw error;
  }
};

// Get sorted documents
export const getSortedDocuments = async (
  collectionName,
  sortField,
  sortDirection = "desc",
  limitCount = 10
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      orderBy(sortField, sortDirection),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching sorted documents:", error);
    throw error;
  }
};

// Add document
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

// Update document
export const updateDocument = async (collectionName, documentId, data) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Delete document
export const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

export function useThemePackages() {
  const getPackagesByTheme = async (theme) => {
    try {
      const childPackagesRef = collection(db, "packages");
      const childQuery = query(
        childPackagesRef,
        where("theme", "==", theme),
        where("status", "in", ["published", "Published"])
      );

      const childSnap = await getDocs(childQuery);
      return Array.from(
        new Set(
          childSnap.docs.map((doc) => sanitizeDocumentData(doc).basePackageId)
        )
      );
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };
  return { getPackagesByTheme };
}

export const getPackagesByType = async (isDomestic = true) => {
  try {
    const conditions = [
      {
        field: "domestic",
        operator: "==",
        value: Boolean(isDomestic),
      },
    ];
    const data = await getDocumentsWithQuery("packages", conditions);
    return data.map((pkg) => ({
      ...pkg,
      type: pkg.domestic ? "Domestic" : "International",
    }));
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getFilteredDocuments = async (collectionName, conditions) => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, ...conditions);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(sanitizeDocumentData);
  } catch (error) {
    console.error("Error fetching filtered documents:", error);
    throw error;
  }
};

export const searchPackages = async (searchTerm) => {
  try {
    const packagesRef = collection(db, "packages");
    const searchTermLower = searchTerm.toLowerCase().trim();

    // Get all packages first
    const querySnapshot = await getDocs(packagesRef);
    const packages = [];

    // Filter packages manually for more flexible search
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Check if packageName or packageTitle contains the search term
      if (
        data.packageName?.toLowerCase().includes(searchTermLower) ||
        data.packageTitle?.toLowerCase().includes(searchTermLower) ||
        data.region?.toLowerCase().includes(searchTermLower)
      ) {
        packages.push({
          id: doc.id,
          packageName: data.packageTitle || data.packageName, // Use packageTitle as it's more consistently present
          ...data,
        });
      }
    });

    return packages;
  } catch (error) {
    return [];
  }
};

export const storeLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, "leads");

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storePotentialLead = async (leadData) => {
  try {
    // Add timestamp to the lead data
    const enrichedLeadData = {
      ...leadData,
      createdAt: serverTimestamp(),
      status: "new", // Default status for new leads
    };

    // Reference to leads collection
    const leadsRef = collection(db, "potentialLeads");

    // Add document to Firestore
    const docRef = await addDoc(leadsRef, enrichedLeadData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing lead:", error);
    throw new Error("Failed to store lead data");
  }
};

export const storeBookings = async (bookingData) => {
  try {
    // Add timestamp to the lead data
    const enrichedBookingData = {
      ...bookingData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, "bookings");

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedBookingData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing booking:", error);
    throw new Error("Failed to create Booking");
  }
};

export const storePayments = async (paymentData) => {
  try {
    // Add timestamp to the lead data
    const enrichedPaymentData = {
      ...paymentData,
      createdAt: serverTimestamp(),
    };

    // Reference to leads collection
    const bookingRef = collection(db, "payments");

    // Add document to Firestore
    const docRef = await addDoc(bookingRef, enrichedPaymentData);

    return docRef.id;
  } catch (error) {
    console.error("Error storing payment:", error);
    throw new Error("Failed to create Payment");
  }
};

async function resolveReference(ref) {
  if (!ref) return null;
  const docSnap = await getDoc(ref);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

async function resolveImageRefs(refs) {
  if (!Array.isArray(refs)) return [];
  return Promise.all(refs.map((ref) => resolveReference(ref)));
}

export const getCuratedPackages = async (packageType) => {
  try {
    const packagesRef = collection(db, "packages");
    const q = query(
      packagesRef,
      where("curated", "==", true),
      where("domestic", "==", packageType === "domestic")
    );

    const querySnapshot = await getDocs(q);
    const packages = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const pkgData = doc.data();

        return {
          id: doc.id,
          ...pkgData,
          bannerImages: await resolveImageRefs(pkgData.bannerImages),
          cardImages: await resolveImageRefs(pkgData.cardImages),
        };
      })
    );
    console.log("Packages:", JSON.parse(JSON.stringify(packages)));
    return packages;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
