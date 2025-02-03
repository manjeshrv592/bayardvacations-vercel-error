"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "../ui/Container";
import {
  MoveRight,
  Search,
  X,
  CircleUserRound,
  Menu,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import navbarData from "./navbarData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { searchPackages } from "@/utils/firebase";
import { useDebounce } from "@/hooks/useDebounce";
// import { useRegions } from "@/contexts/RegionContext";
// import SplashScreen from "../SplashScreen";

const MobileNavbar = () => {
  const inputRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [isHeaderFixed, setIsHeaderFixed] = useState(true);
  const pathname = usePathname();
  // const { regionIsLoading } = useRegions();

  useEffect(() => {
    setIsHeaderFixed(!pathname?.includes("packages"));
  }, [pathname]);

  useEffect(() => {
    const fetchPackages = async () => {
      if (debouncedSearch.trim()) {
        setIsLoading(true);
        try {
          const results = await searchPackages(debouncedSearch);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching packages:", error);
          setSearchResults([]);
        }
        setIsLoading(false);
      } else {
        setSearchResults([]);
      }
    };

    fetchPackages();
  }, [debouncedSearch]);

  const handleActiveItem = (item) => {
    setActiveItem(item);
  };

  const handleIsDropdownActive = () => {
    setIsDropdownActive((prev) => !prev);
  };

  const handleMenuActive = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handleIsSearchActive = () => {
    if (isSearchActive) {
      setSearchTerm("");
      setSearchResults([]);
    }
    setIsSearchActive(!isSearchActive);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 block w-full c-xxl:hidden bg-brand-blue transition-all duration-300",
          {
            "absolute border-b-2 border-solid border-white/30 backdrop-blur-3xl bg-white":
              !isHeaderFixed,
            "!bg-transparent top-[20px] border-none !backdrop-blur-0":
              isSearchActive,
          }
        )}
      >
        {/* {regionIsLoading && <SplashScreen />} */}
        <Container>
          <div
            className={cn(
              "relative mx-auto h-16 overflow-hidden bg-brand-blue transition-all duration-300 ease-in-out w-full",
              {
                "max-w-[800px]": isSearchActive,
                "bg-transparent": isSearchActive || !isHeaderFixed,
              }
            )}
          >
            <nav
              className={cn(
                "h-16 flex items-center gap-8 text-white transition-all duration-300 ease-in-out",
                {
                  "opacity-0 h-0 scale-95": isSearchActive,
                  "opacity-100 scale-100": !isSearchActive,
                }
              )}
            >
              <Link href="/">
                <Image
                  width={150}
                  height={30}
                  alt="Bayard Vacations Logo"
                  src={isHeaderFixed ? "/img/logo.svg" : "/media/logo.svg"}
                  className="h-auto w-[120px] c-sm:w-[150px]"
                />
              </Link>

              <div className="ml-auto flex items-center gap-4 ">
                <Button
                  className={cn(
                    "rounded-full text-white hover:text-brand-blue",
                    {
                      "text-brand-blue hover:text-white hover:bg-brand-blue":
                        !isHeaderFixed,
                    }
                  )}
                  variant="ghost"
                  size="icon"
                  onClick={handleIsSearchActive}
                >
                  <Search strokeWidth={3} />
                </Button>
                <Button
                  className={cn(
                    "hidden rounded-full text-white hover:text-brand-blue",
                    {
                      "text-brand-blue hover:text-white hover:bg-brand-blue":
                        !isHeaderFixed,
                    }
                  )}
                  variant="ghost"
                  size="icon"
                >
                  <Link
                    href="/login"
                    className="flex items-center justify-center"
                  >
                    <CircleUserRound className="!size-6" strokeWidth={2} />
                  </Link>
                </Button>
                <Button
                  className={cn(
                    " rounded-full text-white hover:text-brand-blue",
                    {
                      "text-brand-blue hover:text-white hover:bg-brand-blue":
                        !isHeaderFixed,
                    }
                  )}
                  variant="ghost"
                  size="icon"
                  onClick={handleMenuActive}
                >
                  {isMenuActive ? (
                    <X className="!size-6" strokeWidth={2} />
                  ) : (
                    <Menu className="!size-6" strokeWidth={2} />
                  )}
                </Button>
                <Button
                  className={cn(
                    "hidden c-md:block rounded-full border border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue",
                    {
                      "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
                        !isHeaderFixed,
                    }
                  )}
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </nav>

            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 h-full transition-all duration-300 ease-in-out flex items-center overflow-hidden",
                {
                  "w-0 opacity-0": !isSearchActive,
                  "w-full opacity-100": isSearchActive,
                }
              )}
            >
              <div
                className={cn(
                  "w-full h-16 bg-blue-200 transition-all duration-300 ease-in-out transform rounded-[32px] flex items-center px-8",
                  {
                    "opacity-0 scale-95": !isSearchActive,
                    "opacity-100 scale-100": isSearchActive,
                  }
                )}
              >
                <div>
                  <Search className="text-slate-400" />
                </div>
                <div className="h-full flex-1 px-5">
                  <Input
                    ref={inputRef}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-full border-0 text-xl text-slate-700 shadow-none placeholder:text-slate-400 focus-visible:ring-0"
                    placeholder="Search for Packages, Destinations etc."
                  />
                </div>
                <div>
                  <Button
                    className="size-6 rounded-full bg-white p-0 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
                    onClick={handleIsSearchActive}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>
      {/* Search panel content start */}

      <div
        className={cn(
          " fixed left-1/2 top-[20px] -translate-x-1/2 z-40 rounded-[32px] overflow-hidden transition-all duration-300 ease-in-out origin-bottom w-[calc(100%+72px)] max-w-[912px]",
          {
            "h-0 opacity-0": !isSearchActive,
            "h-[calc(100vh-40px)] opacity-100": isSearchActive,
          }
        )}
        style={{
          pointerEvents: isSearchActive ? "auto" : "none",
        }}
      >
        <div className="size-full px-9">
          <Container className="">
            <div className="h-[calc(100vh-40px)] rounded-[32px] bg-blue-50 px-8 pt-24">
              {isLoading ? (
                <p className="text-sm text-slate-500">Searching packages...</p>
              ) : searchResults.length > 0 ? (
                <>
                  <h4 className="mb-4 text-sm text-slate-500">
                    Available Packages
                  </h4>
                  <ul className="space-y-4 text-brand-blue">
                    {searchResults.map((pkg) => (
                      <li key={pkg.id}>
                        <Link
                          href={`/packages/${pkg.region}/${pkg.packageSlug}`}
                          className="flex items-center gap-3"
                          onClick={() => {
                            handleIsSearchActive();
                            setSearchTerm("");
                          }}
                        >
                          <MoveRight />
                          <span>{pkg.packageTitle}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : searchTerm ? (
                <p className="text-sm text-slate-500">No packages found</p>
              ) : (
                <>
                  <h4 className="mb-4 text-sm text-slate-500">Quick links</h4>
                  <ul className="space-y-4 text-brand-blue">
                    <li>
                      <Link href="/" className="flex items-center gap-3">
                        <MoveRight />
                        <span>Link One</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="flex items-center gap-3">
                        <MoveRight />
                        <span>Link Two</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="flex items-center gap-3">
                        <MoveRight />
                        <span>Link Three</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/" className="flex items-center gap-3">
                        <MoveRight />
                        <span>Link Four</span>
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </Container>
        </div>
      </div>

      {/* Search panel content end */}

      {/* Mobile navbar items start */}
      <ul
        className={cn(
          "fixed left-0 top-[-100%] z-40 size-full bg-brand-blue transition-all duration-300 pt-24 pb-12 px-5 text-white",
          {
            "top-0": isMenuActive,
            "bg-white text-brand-blue": !isHeaderFixed,
          }
        )}
      >
        {navbarData.map((item) => (
          <li key={item.id} className=" ">
            {item.hasDropdown ? (
              <div
                className="flex flex-1 items-center gap-2 py-5"
                onClick={() => {
                  handleIsDropdownActive();
                  handleActiveItem(item);
                }}
              >
                <span>{item.title}</span>
                <span>
                  <ChevronRight className="!size-4" />
                </span>
              </div>
            ) : (
              <Link
                className="inline-block py-5"
                onClick={handleMenuActive}
                href={item.href}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
        <li>
          <Button
            onClick={handleMenuActive}
            className={cn(
              "c-md:hidden rounded-full border border-solid border-white bg-transparent text-white shadow-none hover:bg-white hover:text-brand-blue mt-8",
              {
                "border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white":
                  !isHeaderFixed,
              }
            )}
            asChild
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </li>
      </ul>
      {/* Mobile navbar items end */}
      {/* Inner panel start */}
      <ul
        className={cn(
          "fixed left-[100%] top-0 z-[45] w-full h-screen bg-brand-blue transition-all duration-300 pt-20 pb-12 px-5 text-white",
          {
            "left-0": isDropdownActive,
            "text-brand-blue bg-white": !isHeaderFixed,
          }
        )}
      >
        <div className="h-full overflow-y-scroll">
          <Button
            className="flex items-center  rounded-full bg-white p-0 px-4 text-brand-blue shadow-none hover:bg-brand-blue hover:text-white"
            onClick={handleIsDropdownActive}
          >
            <span>
              <ChevronLeft strokeWidth={3} />
            </span>
            <span className="text-xs font-semibold uppercase">
              Back to Menu
            </span>
          </Button>
          <div>
            {activeItem &&
              activeItem.dropdownContent({
                isHeaderFixed,
                handleActiveItem,
                handleIsDropdownActive,
                handleMenuActive,
              })}
          </div>
        </div>
      </ul>
      {/* Inner panel end */}
    </>
  );
};

export default MobileNavbar;
