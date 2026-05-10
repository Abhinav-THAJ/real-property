"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  return (
    <main className="w-full bg-[#002f4b] pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#002f4b]/80 via-[#002f4b]/60 to-[#002f4b] z-10" />
          <Image
            src="/images/evening_skyline.png"
            alt="Muscat Evening Skyline"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container relative z-20 mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h4 className="text-rpm-gold uppercase tracking-[0.3em] text-sm mb-4">{t("get_in_touch")}</h4>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
              {t("contact_title")}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
              {t("contact_desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 lg:px-12 mb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`lg:w-1/3 flex flex-col gap-8 ${lang === "AR" ? "text-right" : ""}`}
          >
            <div>
              <h2 className="text-3xl font-serif text-white mb-2">{t("office_hq")}</h2>
              <div className={`w-12 h-1 bg-rpm-gold mb-8 ${lang === "AR" ? "ml-auto" : ""}`} />
            </div>

            <div className="glass p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-rpm-gold/5 transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />
              
              <div className="relative z-10">
                <div className={`flex items-start gap-4 mb-8 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-full bg-rpm-navy flex items-center justify-center shrink-0 border border-rpm-gold/30">
                    <MapPin className="w-5 h-5 text-rpm-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">{t("location")}</h4>
                    <p className={`text-gray-400 text-sm leading-relaxed ${lang === "AR" ? "font-serif" : ""}`}>
                      Real Property Management L.L.C<br />
                      Al Rajhi Building, 3rd Floor, Office No. 32<br />
                      South Al Ghubra – Bousher<br />
                      Way No. 53, Building No. 332<br />
                      Muscat 112, Sultanate of Oman
                    </p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 mb-8 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-full bg-rpm-navy flex items-center justify-center shrink-0 border border-rpm-gold/30">
                    <Phone className="w-5 h-5 text-rpm-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">{t("direct_lines")}</h4>
                    <div className="text-gray-400 text-sm flex flex-col gap-1" dir="ltr">
                      <span>(+968) 97739777 (WhatsApp Available)</span>
                      <span>(+968) 97777715</span>
                      <span>(+968) 97778585</span>
                      <span>Landline: 22464012</span>
                    </div>
                  </div>
                </div>

                <div className={`flex items-start gap-4 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                  <div className="w-12 h-12 rounded-full bg-rpm-navy flex items-center justify-center shrink-0 border border-rpm-gold/30">
                    <Mail className="w-5 h-5 text-rpm-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">{t("email_access")}</h4>
                    <div className={`text-gray-400 text-sm flex flex-col gap-1 ${lang === "AR" ? "items-end" : ""}`}>
                      <a href="mailto:asiyabi@mihoman.com" className="hover:text-rpm-gold transition-colors">asiyabi@mihoman.com</a>
                      <a href="mailto:abdulrahoof@rpmoman.com" className="hover:text-rpm-gold transition-colors">abdulrahoof@rpmoman.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-[#003a5c] p-10 md:p-14 rounded-3xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rpm-gold/5 rounded-full blur-[100px] pointer-events-none" />
              
              <h3 className={`text-2xl font-serif text-white mb-8 relative z-10 ${lang === "AR" ? "text-right" : ""}`}>{t("send_message")}</h3>
              
              <form className="relative z-10 flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name"
                      className={`peer w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-rpm-gold transition-colors ${lang === "AR" ? "text-right" : ""}`}
                      placeholder={t("full_name")}
                    />
                    <label htmlFor="name" className={`absolute -top-2 text-xs text-rpm-gold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-rpm-gold ${lang === "AR" ? "right-0" : "left-0"}`}>
                      {t("full_name")}
                    </label>
                  </div>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      className={`peer w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-rpm-gold transition-colors ${lang === "AR" ? "text-right" : ""}`}
                      placeholder={t("email_placeholder")}
                    />
                    <label htmlFor="email" className={`absolute -top-2 text-xs text-rpm-gold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-rpm-gold ${lang === "AR" ? "right-0" : "left-0"}`}>
                      {t("email_placeholder")}
                    </label>
                  </div>
                </div>

                <div className="relative mt-4">
                  <input 
                    type="tel" 
                    id="phone"
                    className={`peer w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-rpm-gold transition-colors ${lang === "AR" ? "text-right" : ""}`}
                    placeholder={t("phone_number")}
                  />
                  <label htmlFor="phone" className={`absolute -top-2 text-xs text-rpm-gold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-rpm-gold ${lang === "AR" ? "right-0" : "left-0"}`}>
                    {t("phone_number")}
                  </label>
                </div>

                <div className="relative mt-4">
                  <select 
                    id="interest"
                    className={`w-full bg-transparent border-b border-white/20 py-4 text-gray-400 focus:outline-none focus:border-rpm-gold transition-colors appearance-none cursor-pointer ${lang === "AR" ? "text-right" : ""}`}
                  >
                    <option value="" disabled selected>{t("subject_interest")}</option>
                    <option value="management" className="bg-[#003a5c]">{t("service_mgmt_title")}</option>
                    <option value="brokerage" className="bg-[#003a5c]">{t("service_brokerage_title")}</option>
                    <option value="facility" className="bg-[#003a5c]">{t("service_facility_title")}</option>
                    <option value="other" className="bg-[#003a5c]">{t("other_inquiry")}</option>
                  </select>
                </div>

                <div className="relative mt-4">
                  <textarea 
                    id="message"
                    rows={4}
                    className={`peer w-full bg-transparent border-b border-white/20 py-4 text-white placeholder-transparent focus:outline-none focus:border-rpm-gold transition-colors resize-none ${lang === "AR" ? "text-right" : ""}`}
                    placeholder={t("your_message")}
                  ></textarea>
                  <label htmlFor="message" className={`absolute -top-2 text-xs text-rpm-gold uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-rpm-gold ${lang === "AR" ? "right-0" : "left-0"}`}>
                    {t("your_message")}
                  </label>
                </div>

                <button 
                  type="button"
                  className={`mt-6 flex items-center justify-center gap-3 bg-rpm-gold text-black py-5 px-8 rounded-sm font-medium uppercase tracking-widest hover:bg-white transition-all duration-300 w-full sm:w-auto ${lang === "AR" ? "self-end flex-row-reverse" : "self-start"}`}
                >
                  <span>{t("submit_inquiry")}</span>
                  <Send className={`w-4 h-4 ${lang === "AR" ? "rotate-180" : ""}`} />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] w-full rounded-3xl overflow-hidden bg-black/20 border-white/10 p-2"
        >
          <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14628.749547515226!2d58.4009778!3d23.5617267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e91ffa33b2bb08f%3A0x6b1ccfa7c58d0421!2sBousher%2C%20Muscat%2C%20Oman!5e0!3m2!1sen!2sus!4v1698248312000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[20px]"
          ></iframe>
          
          <div className={`absolute bottom-10 z-30 bg-[#002f4b] p-6 rounded-2xl border border-white/10 max-w-sm hidden md:block ${lang === "AR" ? "right-10 text-right" : "left-10"}`}>
            <div className={`flex items-center gap-3 mb-4 ${lang === "AR" ? "flex-row-reverse" : ""}`}>
              <div className="w-10 h-10 rounded-full bg-rpm-gold/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-rpm-gold" />
              </div>
              <h4 className="text-white font-serif text-lg">RPM Headquarters</h4>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t("visit_office")}
            </p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className={`flex items-center gap-2 text-xs uppercase tracking-widest text-rpm-gold hover:text-white transition-colors ${lang === "AR" ? "flex-row-reverse" : ""}`}>
              {t("get_directions")} <ArrowRight className={`w-3 h-3 ${lang === "AR" ? "rotate-180" : ""}`} />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
