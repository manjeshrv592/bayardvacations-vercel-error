export const getUniqueRegions = (array) => {
  return [...new Set(array.map((item) => item.region))];
};

export const formatRegionName = (str) =>
  str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
