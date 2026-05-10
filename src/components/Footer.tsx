"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { lang, t } = useLanguage();
  
  return (
    <footer className="bg-[#003a5c] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 ${lang === "AR" ? "text-right" : ""}`}>
          
          <div className="flex flex-col gap-6">
            <div className={`bg-white px-6 py-4 rounded-sm inline-flex w-max shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-2 ${lang === "AR" ? "ml-auto" : ""}`}>
              <img src="/logo.png" alt="RPM Logo" className="h-12 md:h-14 w-auto object-contain object-left" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t("footer_desc")}
            </p>
            <h3 className="text-xl font-serif italic text-rpm-gold mt-2">{t("the_face_of_trust")}</h3>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={`text-lg font-medium text-rpm-gold uppercase tracking-widest border-b border-rpm-gold/20 pb-4 inline-block w-max ${lang === "AR" ? "ml-auto" : ""}`}>{t("quick_links")}</h4>
            <ul className="flex flex-col gap-4">
              {['home', 'about', 'services', 'properties', 'contact'].map((key) => (
                <li key={key}>
                  <Link href={key === 'home' ? '/' : `/${key.toLowerCase()}`} className="text-gray-300 hover:text-rpm-gold transition-colors text-sm uppercase tracking-wider">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={`text-lg font-medium text-rpm-gold uppercase tracking-widest border-b border-rpm-gold/20 pb-4 inline-block w-max ${lang === "AR" ? "ml-auto" : ""}`}>{t("contact")}</h4>
            <ul className={`flex flex-col gap-4 text-sm text-gray-300 ${lang === "AR" ? "items-end" : ""}`}>
              <li className={`flex items-start gap-3 hover:text-white transition-colors ${lang === "AR" ? "flex-row-reverse text-right" : ""}`}>
                <MapPin className="w-5 h-5 text-rpm-gold shrink-0" />
                <span className={lang === "AR" ? "font-serif" : ""}>Real Property Management L.L.C<br/>Al Rajhi Building, 3rd Floor, Office No. 32<br/>South Al Ghubra – Bousher, Muscat 112<br/>Sultanate of Oman</span>
              </li>
              <li className={`flex items-center gap-3 hover:text-white transition-colors ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                <Phone className="w-5 h-5 text-rpm-gold shrink-0" />
                <span dir="ltr">(+968) 97739777 / 22464012</span>
              </li>
              <li className={`flex items-center gap-3 hover:text-white transition-colors ${lang === "AR" ? "flex-row-reverse" : ""}`}>
                <Mail className="w-5 h-5 text-rpm-gold shrink-0" />
                <span>info@rpmoman.com</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className={`text-lg font-medium text-rpm-gold uppercase tracking-widest border-b border-rpm-gold/20 pb-4 inline-block w-max ${lang === "AR" ? "ml-auto" : ""}`}>{t("newsletter")}</h4>
            <p className="text-sm text-gray-400">{t("newsletter_desc")}</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder={t("email_placeholder")} 
                className={`bg-white/5 border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-rpm-gold transition-colors w-full ${lang === "AR" ? "text-right" : ""}`}
              />
              <button className="bg-rpm-gold text-black uppercase tracking-widest text-sm font-medium py-3 hover:bg-white transition-colors">
                {t("subscribe")}
              </button>
            </form>
            <div className={`flex gap-4 mt-2 ${lang === "AR" ? "justify-end" : ""}`}>
              <a href="https://www.facebook.com/share/1H5TZMA8HJ/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rpm-gold hover:text-black transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/rpmrealestateom?utm_source=qr&igsh=MXRpZHlrMTBpenYwYg==" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rpm-gold hover:text-black transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@realpropertymanagementom?_r=1&_t=ZS-94EgUmB5dYr" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rpm-gold hover:text-black transition-all text-sm font-bold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68l.01.2a6.29 6.29 0 0 0 3.11 5.36A6.36 6.36 0 0 0 12.7 22a6.32 6.32 0 0 0 3.12-11.75V6.8a8.32 8.32 0 0 0 4.18 1.13v-3.4a4.41 4.41 0 0 1-.41 2.16z"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className={`border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 tracking-wider ${lang === "AR" ? "md:flex-row-reverse" : ""}`}>
          <p>&copy; {new Date().getFullYear()} Real Property Management L.L.C. {t("all_rights_reserved")}</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-rpm-gold transition-colors">{t("privacy_policy")}</Link>
            <Link href="/terms" className="hover:text-rpm-gold transition-colors">{t("terms_of_service")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
