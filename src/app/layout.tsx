import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PropertyProvider } from "@/context/PropertyContext";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Real Property Management L.L.C | Muscat, Oman",
  description: "Premium property management, brokerage, facility management, and maintenance services in Muscat, Sultanate of Oman. The Face of Trust.",
  openGraph: {
    title: "Real Property Management L.L.C | Muscat, Oman",
    description: "Your Gateway to Trusted Real Estate Solutions in Oman",
    url: "https://rpmoman.com",
    siteName: "Real Property Management L.L.C",
    images: [
      {
        url: "/images/hero_skyline.png",
        width: 1200,
        height: 630,
        alt: "Real Property Management L.L.C",
      },
    ],
    locale: "en_OM",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#002f4b] text-[#F8F9FA]`}>
        <LanguageProvider>
          <PropertyProvider>
            <Navbar />
            {children}
            <WhatsAppButton />
            <Footer />
          </PropertyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
