"use client";
import { useEffect, useState } from "react";
import { useRegions } from "@/contexts/RegionContext";
import { cn } from "@/lib/utils";
import Link from "next/link";

const InternationalContent = ({
  setActiveDropdown,
  handleActiveItem,
  handleIsDropdownActive,
  handleMenuActive,
  isHeaderFixed,
}) => {
  const [activeItem, setActiveItem] = useState(null);
  const { internationalRegions } = useRegions();
  console.log(isHeaderFixed);

  const filteredContinents = internationalRegions.filter(
    (item) => item.regions && item.regions.length > 0
  );

  useEffect(() => {
    if (filteredContinents && filteredContinents.length > 0 && !activeItem) {
      setActiveItem(filteredContinents[0]);
    }
  }, [filteredContinents, activeItem]);

  if (!internationalRegions || internationalRegions.length === 0) {
    return <div>No Regions</div>;
  }

  const handleClose = () => {
    setActiveDropdown?.(null);
    handleActiveItem?.(null);
    handleIsDropdownActive?.();
    handleMenuActive?.();
  };

  const handleItemClick = (item) => {
    console.log("Selected continent:", item);
    setActiveItem(item);
  };

  return (
    <div className="mx-auto c-lg:p-8">
      <div className="grid c-lg:grid-cols-[200px_1fr]">
        <ul
          className={cn(
            "my-4 flex max-w-[calc(100%-40px)] gap-1 overflow-hidden overflow-x-scroll py-4 c-lg:my-0 c-lg:max-w-full c-lg:flex-col c-lg:items-end c-lg:justify-center c-lg:gap-8 c-lg:overflow-x-hidden c-lg:border-r c-lg:border-solid c-lg:py-12 c-lg:pr-4 c-lg:text-right"
          )}
        >
          {filteredContinents.map((item) => (
            <li
              className={cn(
                "cursor-pointer rounded-lg px-4 py-1 flex items-center gap-2 transition-all duration-300 text-white c-lg:hover:bg-white c-lg:hover:text-brand-blue c-lg:border-white/30",
                {
                  "text-brand-blue c-lg:hover:bg-brand-blue c-lg:hover:text-white c-lg:border-brand-blue/30":
                    !isHeaderFixed,
                }
              )}
              key={item.feKey}
              onClick={() => handleItemClick(item)}
            >
              {item.displayName}
            </li>
          ))}
        </ul>

        <ul
          className={cn(
            "grid gap-6 c-sm:grid-cols-2 c-md:grid-cols-3 c-lg:grid-cols-4 c-lg:py-6 c-lg:pl-8"
          )}
        >
          {activeItem &&
            activeItem.regions &&
            activeItem.regions.map((region) => (
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
        </ul>
      </div>
    </div>
  );
};

export default InternationalContent;
