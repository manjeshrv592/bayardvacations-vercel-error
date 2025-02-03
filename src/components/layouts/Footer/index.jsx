import React from "react";
import { v4 as uuidv4 } from "uuid";
import Container from "@/components/ui/Container";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { usePackages } from "@/contexts/PackageContext";
import { formatRegionName, getUniqueRegions } from "@/utils/navbarHelpers";
import categoryData from "../../../../data/categoryData";
import quickLinksData from "../../../../data/quickLinksData";
import Image from "next/image";

const Footer = () => {
  const { internationalPackages, domesticPackages } = usePackages();

  const internationalRegions = getUniqueRegions(internationalPackages);
  const domesticRegions = getUniqueRegions(domesticPackages);

  return (
    <footer className="section-padding bg-brand-blue">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-8 text-white c-lg:flex-row c-lg:items-end">
          <div className="w-[240px]">
            <Image
              src="/img/logo.svg"
              alt="Bayard vacations logo"
              width={480}
              height={96}
              className="h-auto w-full max-w-[300px]"
              priority
            />
          </div>
          <div>
            <h4 className="mb-2 font-bold">Follow us on</h4>
            <div className="flex gap-8 text-lg text-white c-md:text-xl">
              <a
                href="https://www.facebook.com/bayardvacation/"
                target="_blank"
              >
                <FaFacebook className="opacity-80 transition-all duration-300 hover:opacity-100" />
              </a>
              <a
                href="https://www.instagram.com/bayardvacations"
                target="_blank"
              >
                <FaInstagram className="opacity-80 transition-all duration-300 hover:opacity-100" />
              </a>
              <a href="https://x.com/bayardvacations" target="_blank">
                <FaSquareXTwitter className="opacity-80 transition-all duration-300 hover:opacity-100" />
              </a>
              <a
                href="https://www.linkedin.com/company/bayard-vacations/"
                target="_blank"
              >
                <FaLinkedinIn className="opacity-80 transition-all duration-300 hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-8 text-white">
          <div>
            <h5 className="mb-2 font-bold">International</h5>
            <ul className="flex flex-wrap items-center gap-2 text-sm">
              {internationalRegions.map((region, i, arr) => (
                <li key={uuidv4()} className="flex items-center gap-2">
                  <Link
                    href={`/packages/${region}`}
                    className="border-b border-solid border-transparent leading-[100%] transition-all duration-300 hover:border-white"
                  >
                    {formatRegionName(region)}
                  </Link>
                  {i !== arr.length - 1 && <span>|</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-2 font-bold">Domestic</h5>
            <ul className="flex flex-wrap items-center gap-2 text-sm">
              {domesticRegions.map((region, i, arr) => (
                <li key={uuidv4()} className="flex items-center gap-2">
                  <Link
                    href={`/packages/${region}`}
                    className="border-b border-solid border-transparent leading-[100%] transition-all duration-300 hover:border-white"
                  >
                    {formatRegionName(region)}
                  </Link>
                  {i !== arr.length - 1 && <span>|</span>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-2 font-bold">Themes</h5>
            <ul className="flex flex-wrap items-center gap-4 text-sm">
              {categoryData.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/categories/${item.slug}`}
                    className="border-b border-solid border-transparent transition-all duration-300 hover:border-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="my-8 h-px bg-white c-md:my-12"></div>

        <div className="flex flex-col justify-between gap-12 text-xs text-white c-xl:flex-row">
          <ul className=" flex flex-wrap gap-6 text-xs">
            {quickLinksData.map((item) => (
              <li key={item.id}>
                <Link
                  href={`${item.href}`}
                  className="border-b border-solid border-transparent transition-all duration-300 hover:border-white"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <p className=" ">
            &copy; All copyrights reserved {new Date().getFullYear()} Bayard
            Vacations
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
