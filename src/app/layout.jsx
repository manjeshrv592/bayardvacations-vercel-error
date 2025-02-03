"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./globals.css";
import { PackageProvider } from "@/contexts/PackageContext";
import PackageInitializer from "@/components/PackageInitializer";
import { Sora, Damion } from "next/font/google";
import Footer from "@/components/layouts/Footer";
import DesktopNavbar from "@/components/Navbars/DesktopNavbar";
import MobileNavbar from "@/components/Navbars/MobileNavbar";
import { ModalProvider } from "@/contexts/leadContext";
import localFont from "next/font/local";
import LeadForm from "@/components/LeadForm";
import { Toaster } from "@/components/ui/sonner";
import { CheckoutProvider } from "@/contexts/CheckoutContext";
import { AuthProvider } from "@/contexts/AuthContext";
import FloatingLeadButton from "@/components/FloatingLeadButton";
// import { RegionProvider } from "@/contexts/RegionContext";

const nord = localFont({
  src: [
    {
      path: "fonts/nord-thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "fonts/nord-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/nord-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/nord-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/nord-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/nord-black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-nord", // CSS variable to use with Tailwind
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-sora",
});

const damion = Damion({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-damion",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="128x128" />
      </head>
      <AuthProvider>
        <body
          className={`${sora.className} ${nord.variable} ${damion.variable}  antialiased`}
        >
          <ModalProvider>
            <CheckoutProvider>
              <PackageProvider>
                <PackageInitializer>
                  {/* <RegionProvider> */}
                  <DesktopNavbar />
                  <MobileNavbar />

                  <main>
                    {children} <FloatingLeadButton />
                  </main>
                  <LeadForm />
                  <Toaster />
                  <Footer />
                  {/* </RegionProvider> */}
                </PackageInitializer>
              </PackageProvider>
            </CheckoutProvider>
          </ModalProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
