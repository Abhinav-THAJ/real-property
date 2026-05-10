"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: lang === "EN" ? "Home" : "الرئيسية", path: "/" },
    { name: lang === "EN" ? "About" : "من نحن", path: "/about" },
    { name: lang === "EN" ? "Services" : "خدماتنا", path: "/services" },
    { name: lang === "EN" ? "Properties" : "العقارات", path: "/properties" },
    { name: lang === "EN" ? "Contact" : "اتصل بنا", path: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/90 border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center gap-2 bg-white px-4 py-2.5 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-transform hover:scale-105">
          <img src="/logo.png" alt="RPM Logo" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm uppercase tracking-widest font-medium transition-colors hover:text-rpm-gold ${
                  isActive ? "text-rpm-gold" : "text-white"
                } ${lang === "AR" ? "font-serif" : ""}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-rpm-gold"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
            className="flex items-center gap-2 text-sm text-white hover:text-rpm-gold transition-colors font-medium"
          >
            <Globe className="w-4 h-4 text-rpm-gold" />
            <span className={lang === "AR" ? "font-serif" : ""}>
              {lang === "EN" ? "العربية" : "English"}
            </span>
          </button>
          <Link
            href="/contact"
            className="px-6 py-2 border border-rpm-gold/50 text-rpm-gold hover:bg-rpm-gold hover:text-black transition-all duration-300 rounded-sm text-sm tracking-widest uppercase font-medium"
          >
            {lang === "EN" ? "Inquire Now" : "استفسر الآن"}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-10 text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-[#002f4b]/95 backdrop-blur-xl border-b border-white/10 flex flex-col p-6 md:hidden gap-6"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-lg uppercase tracking-widest text-white hover:text-rpm-gold transition-colors ${lang === "AR" ? "font-serif text-right" : ""}`}
            >
              {link.name}
            </Link>
          ))}
          <div className={`flex items-center gap-4 mt-4 pt-4 border-t border-white/10 ${lang === "AR" ? "justify-end" : ""}`}>
            <button 
              onClick={() => {
                setLang(lang === "EN" ? "AR" : "EN");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-white hover:text-rpm-gold transition-colors"
            >
              <Globe className="w-5 h-5 text-rpm-gold" />
              <span className={lang === "AR" ? "font-serif" : ""}>
                {lang === "EN" ? "العربية" : "English"}
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
