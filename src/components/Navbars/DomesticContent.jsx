"use client";
import Link from "next/link";
// import { useRegions } from "@/contexts/RegionContext";

const DomesticContent = ({
  setActiveDropdown,
  handleActiveItem,
  handleIsDropdownActive,
  handleMenuActive,
}) => {
  // const { domesticRegions } = useRegions();

  if (!domesticRegions || domesticRegions.length === 0)
    return <div>No Regions</div>;

  const handleClose = () => {
    setActiveDropdown && setActiveDropdown(null);
    handleActiveItem && handleActiveItem(null);
    handleIsDropdownActive && handleIsDropdownActive();
    handleMenuActive && handleMenuActive();
  };

  return (
    <div className="mx-auto max-w-screen-lg py-8 c-lg:p-8">
      {/* <ul className="grid gap-6 c-sm:grid-cols-2 c-md:grid-cols-3 c-lg:grid-cols-4">
        {domesticRegions.map((region) => (
          <li key={region.id}>
            <Link
              onClick={handleClose}
              className="domestic-packages-content rounded-full px-4 py-2 transition-all duration-300 ease-in"
              href={`/packages/${region.slug}`}
            >
              {region.name}
            </Link>
          </li>
        ))}
      </ul> */}
      Hello
    </div>
  );
};

export default DomesticContent;
