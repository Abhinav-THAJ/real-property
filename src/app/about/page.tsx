"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang, t } = useLanguage();
  return (
    <main className="w-full bg-[#002f4b] pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4b] via-[#002f4b]/80 to-transparent z-10" />
          <Image
            src="/images/office_team.png"
            alt="Oman Corporate Office"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className={`max-w-2xl ${lang === "AR" ? "text-right ml-auto" : ""}`}
          >
            <h4 className="text-rpm-gold uppercase tracking-[0.3em] text-sm mb-4">{t("corporate_overview")}</h4>
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 leading-tight">
              {t("about_title")}
            </h1>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              {t("about_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6 lg:px-12 mb-32">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative h-[500px] w-full rounded-2xl overflow-hidden"
          >
            <Image
              src="/images/evening_skyline.png"
              alt="Our Story"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border border-rpm-gold/20 rounded-2xl m-4 pointer-events-none" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`lg:w-1/2 ${lang === "AR" ? "text-right" : ""}`}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">{t("legacy_title")}</h2>
            <div className={`w-20 h-1 bg-rpm-gold mb-8 ${lang === "AR" ? "ml-auto" : ""}`} />
            <p className="text-gray-300 font-light leading-relaxed mb-6">
              {t("legacy_desc1")}
            </p>
            <p className="text-gray-300 font-light leading-relaxed">
              {t("legacy_desc2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-6 lg:px-12 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#003a5c] p-12 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-rpm-gold/5 group-hover:bg-rpm-gold/10 transition-colors" />
            <h3 className="text-2xl font-serif text-rpm-gold mb-6 relative z-10">{t("vision")}</h3>
            <p className="text-gray-300 leading-relaxed font-light relative z-10">
              {t("vision_desc")}
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`glass p-12 rounded-2xl ${lang === "AR" ? "text-right" : ""}`}
          >
            <h3 className="text-2xl font-serif text-white mb-6">{t("mission")}</h3>
            <p className="text-gray-300 leading-relaxed font-light">
              {t("mission_desc")}
            </p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
