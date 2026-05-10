"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Key, ShieldCheck, Wrench, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesPage() {
  const { lang, t } = useLanguage();
  const services = [
    {
      id: "management",
      title: t("service_mgmt_title"),
      desc: t("service_mgmt_desc"),
      icon: Key,
      image: "/images/office_team.png",
      features: [t("tenant_screening"), t("rent_collection"), t("financial_reporting"), t("lease_administration")],
    },
    {
      id: "brokerage",
      title: t("service_brokerage_title"),
      desc: t("service_brokerage_desc"),
      icon: ShieldCheck,
      image: "/images/luxury_property.png",
      features: [t("property_valuation"), t("investment_advisory"), t("market_analysis"), t("negotiation_support")],
      reverse: true,
    },
    {
      id: "facility",
      title: t("service_facility_title"),
      desc: t("service_facility_desc"),
      icon: Wrench,
      image: "/images/facility_management.png",
      features: [t("preventative_maintenance"), t("security_services"), t("energy_management"), t("vendor_coordination")],
    },
    {
      id: "maintenance",
      title: t("service_maintenance_title"),
      desc: t("service_maintenance_desc"),
      icon: Sparkles,
      image: "/images/maintenance_cleaning.png",
      features: [t("deep_cleaning"), t("hvac_maintenance"), t("plumbing_electrical"), t("emergency_support")],
      reverse: true,
    },
  ];

  return (
    <main className="w-full bg-[#002f4b] pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4b] via-transparent to-[#003a5c]/50 z-10 mix-blend-multiply" />
          <Image
            src="/images/commercial_building.png"
            alt="Oman Commercial Buildings"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h4 className="text-rpm-gold uppercase tracking-[0.3em] text-sm mb-6">{t("our_expertise")}</h4>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
              {t("comprehensive_services")}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
              {t("about_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-32">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col ${service.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
              
              <motion.div
                initial={{ opacity: 0, x: service.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden group"
              >
                <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Floating Info Card */}
                <div className={`absolute bottom-8 ${service.reverse ? 'left-8' : 'right-8'} glass p-6 rounded-xl backdrop-blur-md border-white/10 hidden md:block max-w-xs`}>
                  <service.icon className="w-8 h-8 text-rpm-gold mb-3" />
                  <h4 className="text-white font-serif text-lg mb-1">{service.title}</h4>
                  <p className="text-xs text-gray-300 uppercase tracking-wider">Premium Standard</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: service.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:w-1/2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-serif text-white/10 font-bold">0{index + 1}</span>
                  <div className="h-[1px] w-12 bg-rpm-gold" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">{service.title}</h2>
                <p className="text-gray-300 font-light leading-relaxed mb-8">
                  {service.desc}
                </p>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-rpm-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className={`inline-flex items-center gap-3 text-sm uppercase tracking-widest text-rpm-gold hover:text-white transition-colors group ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                  {t("inquire_now")} 
                  <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-2 transition-transform ${lang === "AR" ? "rotate-180" : ""}`} />
                </Link>
              </motion.div>

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
