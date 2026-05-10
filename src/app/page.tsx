"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Building, Users, Clock, Briefcase, MapPin, Bed, Maximize, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { lang, t } = useLanguage();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  const stats = [
    { value: "200+", label: t("managed_properties"), icon: Building },
    { value: "750+", label: t("satisfied_clients"), icon: Users },
    { value: "7+", label: t("years_experience"), icon: Clock },
    { value: "30+", label: t("professionals"), icon: Briefcase },
  ];

  const services = [
    { title: t("service_mgmt_title"), desc: t("service_mgmt_desc"), image: "/images/office_team.png" },
    { title: t("service_brokerage_title"), desc: t("service_brokerage_desc"), image: "/images/luxury_property.png" },
    { title: t("service_facility_title"), desc: t("service_facility_desc"), image: "/images/facility_management.png" },
    { title: t("service_maintenance_title"), desc: t("service_maintenance_desc"), image: "/images/maintenance_cleaning.png" },
  ];

  const featuredProperties = [
    { title: "Al Mouj Luxury Villa", location: "Al Mouj, Muscat", price: "OMR 450,000", type: "Sale", beds: 5, area: "600 sqm", image: "/images/luxury_property.png" },
    { title: "Muscat Bay Penthouse", location: "Muscat Bay", price: "OMR 2,500 / mo", type: "Rent", beds: 3, area: "250 sqm", image: "/images/hero_skyline.png" },
    { title: "Bousher Commercial Hub", location: "Bousher", price: "OMR 1,200,000", type: "Sale", beds: 0, area: "1200 sqm", image: "/images/commercial_building.png" },
  ];

  const upcomingProjects = [
    { title: t("upcoming_onyx_title"), type: t("upcoming_onyx_type"), status: t("coming_soon") },
    { title: t("upcoming_tower_title"), type: t("upcoming_tower_type"), status: t("in_development") },
    { title: t("upcoming_careers_title"), type: t("upcoming_careers_type"), status: t("vacancies") },
  ];

  return (
    <main className="w-full overflow-hidden bg-[#002f4b]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#002f4b]/80 via-transparent to-[#002f4b] z-10" />
          <Image
            src="/images/hero_skyline.png"
            alt="Muscat Skyline"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>

        <div className="container relative z-20 mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between mt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className={`lg:w-1/2 ${lang === "AR" ? "text-right" : ""}`}
          >
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6 text-white drop-shadow-2xl">
              {t("hero_title")} <br />
              <span className="text-gradient font-bold">{t("hero_title_gradient")}</span> <br />
              {t("hero_title_end")}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
              {t("hero_desc")}
            </p>
            <div className={`flex flex-wrap gap-4 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
              <Link href="/properties" className="px-8 py-4 bg-rpm-gold text-black font-medium uppercase tracking-widest text-sm hover:bg-white transition-all duration-300">
                {t("explore_properties")}
              </Link>
              <Link href="/contact" className="px-8 py-4 border border-white/30 text-white font-medium uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm">
                {t("contact_us")}
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="hidden lg:block lg:w-1/3"
          >
            <div className="glass p-6 rounded-2xl relative group cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-rpm-gold/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-xl">
                <Image src="/images/luxury_property.png" alt="Featured Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="absolute top-4 left-4 bg-rpm-navy/80 backdrop-blur-md px-3 py-1 text-xs text-rpm-gold tracking-widest uppercase">Featured</div>
              </div>
              <h3 className="text-2xl font-serif text-white mb-2">Muscat Bay Villa</h3>
              <p className="text-rpm-gold mb-4">Premium Location</p>
              <div className="flex justify-between text-sm text-gray-300 border-t border-white/10 pt-4">
                <span>{t("view_details")}</span>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-2 transition-transform ${lang === "AR" ? "rotate-180" : ""}`} />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400">{t("scroll")}</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-full h-1/2 bg-rpm-gold absolute top-0"
            />
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-24 relative z-20 -mt-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="stat-card glass border-rpm-gold/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_10px_40px_-10px_rgba(197,168,128,0.2)]"
              >
                <stat.icon className="w-8 h-8 text-rpm-gold mb-4" />
                <h3 className="text-4xl md:text-5xl font-serif text-white mb-2">{stat.value}</h3>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section py-24 bg-[#002135] relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 ${lang === "AR" ? "md:flex-row-reverse" : ""}`}>
            <div className={`max-w-2xl ${lang === "AR" ? "text-right" : ""}`}>
              <h4 className="text-rpm-gold uppercase tracking-[0.2em] text-sm mb-4">{t("our_expertise")}</h4>
              <h2 className="text-4xl md:text-5xl font-serif text-white">{t("comprehensive_services")}</h2>
            </div>
            <Link href="/services" className={`flex items-center gap-2 text-sm uppercase tracking-widest text-gray-300 hover:text-rpm-gold transition-colors ${lang === "AR" ? "flex-row-reverse" : ""}`}>
              {t("view_all_services")} <ArrowRight className={`w-4 h-4 ${lang === "AR" ? "rotate-180" : ""}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="service-card group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002f4b] via-[#002f4b]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className={`absolute inset-0 p-10 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ${lang === "AR" ? "items-end text-right" : ""}`}>
                  <h3 className="text-2xl font-serif text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
                    {service.desc}
                  </p>
                  <div className="w-12 h-12 rounded-full border border-rpm-gold/50 flex items-center justify-center text-rpm-gold group-hover:bg-rpm-gold group-hover:text-black transition-colors">
                    <ArrowRight className={`w-5 h-5 transform transition-transform duration-300 ${lang === "AR" ? "rotate-[135deg] group-hover:rotate-180" : "-rotate-45 group-hover:rotate-0"}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-[#002f4b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rpm-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <h4 className="text-rpm-gold uppercase tracking-[0.2em] text-sm mb-4">{t("exclusive_portfolio")}</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t("featured_properties")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((prop, i) => (
              <div key={i} className="group bg-[#003a5c]/50 border border-white/5 rounded-2xl overflow-hidden hover:border-rpm-gold/30 transition-colors duration-500">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={prop.image} alt={prop.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white uppercase tracking-wider rounded-sm">
                    {prop.type === "Sale" ? t("for_sale") : t("for_rent")}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-rpm-gold text-black px-4 py-2 text-sm font-medium rounded-sm">
                    {prop.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-serif text-white mb-2 group-hover:text-rpm-gold transition-colors">{prop.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                    <MapPin className="w-4 h-4" /> {prop.location}
                  </div>
                  <div className={`flex items-center gap-6 text-sm text-gray-300 border-t border-white/5 pt-6 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                    {prop.beds > 0 && (
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-rpm-gold" /> {prop.beds} {t("beds")}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Maximize className="w-4 h-4 text-rpm-gold" /> {prop.area} {t("area")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/properties" className="inline-flex items-center gap-3 px-8 py-4 border border-rpm-gold text-rpm-gold hover:bg-rpm-gold hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-medium">
              {t("view_all_props")}
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Projects */}
      <section className="py-24 bg-[#002135] relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/images/evening_skyline.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h4 className="text-rpm-gold uppercase tracking-[0.2em] text-sm mb-4">{t("future_vision")}</h4>
            <h2 className="text-4xl md:text-5xl font-serif text-white">{t("upcoming_projects")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingProjects.map((project, i) => (
              <div key={i} className="glass p-8 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-rpm-gold/0 group-hover:bg-rpm-gold/5 transition-colors duration-500" />
                <div className="w-12 h-12 mb-6 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-rpm-gold/50 transition-colors">
                  <Star className="w-5 h-5 text-rpm-gold" />
                </div>
                <h3 className="text-xl font-serif text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-8">{project.type}</p>
                <div className="text-xs uppercase tracking-widest text-rpm-gold border border-rpm-gold/30 inline-block px-3 py-1 rounded-full">
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
