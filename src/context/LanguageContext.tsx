"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "EN" | "AR";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  EN: {
    // Nav
    home: "Home",
    about: "About",
    services: "Services",
    properties: "Properties",
    contact: "Contact",
    inquire_now: "Inquire Now",
    
    // Hero
    hero_title: "Your Gateway to",
    hero_title_gradient: "Trusted Real Estate",
    hero_title_end: "Solutions",
    hero_desc: "Premium property management, brokerage, facility management, and maintenance services in Muscat, Sultanate of Oman.",
    explore_properties: "Explore Properties",
    contact_us: "Contact Us",
    featured: "Featured",
    scroll: "Scroll",
    
    // Stats
    managed_properties: "Managed Properties",
    satisfied_clients: "Satisfied Clients",
    years_experience: "Years Experience",
    professionals: "Professionals",
    
    // Services
    our_expertise: "Our Expertise",
    comprehensive_services: "Comprehensive Real Estate Services",
    view_all_services: "View All Services",
    service_mgmt_title: "Real Estate Management",
    service_mgmt_desc: "Comprehensive management for optimal returns.",
    service_brokerage_title: "Real Estate Brokerage",
    service_brokerage_desc: "Expert guidance in buying and selling.",
    service_facility_title: "Facility Management",
    service_facility_desc: "Maintaining asset value and functionality.",
    service_maintenance_title: "Maintenance & Cleaning",
    service_maintenance_desc: "Premium upkeep for luxury standards.",
    
    // Properties
    exclusive_portfolio: "Exclusive Portfolio",
    featured_properties: "Featured Properties",
    view_all_props: "View All Properties",
    for_sale: "For Sale",
    for_rent: "For Rent",
    beds: "Beds",
    area: "Area",
    view_details: "View Details",
    
    // Upcoming
    future_vision: "Future Vision",
    upcoming_projects: "Upcoming Projects",
    coming_soon: "Coming Soon",
    in_development: "In Development",
    vacancies: "View Vacancies",
    
    // About
    corporate_overview: "Corporate Overview",
    about_title: "Pioneering Luxury Real Estate in Oman",
    about_desc: "We deliver investor-grade corporate experiences through premium property management, brokerage, and elite facility services.",
    legacy_title: "Our Legacy of Excellence",
    legacy_desc1: "Established in the heart of Muscat, Real Property Management L.L.C has grown into a billion-dollar standard luxury brand. We redefine the real estate landscape in the Sultanate of Oman by bridging investor expectations with high-yield, world-class properties.",
    legacy_desc2: "Our commitment goes beyond simple transactions. We build lasting relationships, maintaining the highest levels of trust, transparency, and architectural appreciation. We are proud to be the face of trust in Oman's thriving property market.",
    vision: "Our Vision",
    vision_desc: "To be the most prestigious and highly sought-after real estate partner in the GCC, defining the future of luxury living and corporate infrastructure across the Sultanate of Oman.",
    mission: "Our Mission",
    mission_desc: "Delivering unrivaled property management and brokerage services through innovative solutions, meticulous facility upkeep, and an unwavering dedication to client success and satisfaction.",
    leadership: "Leadership",
    
    // Footer
    footer_desc: "Your gateway to trusted real estate solutions. Providing premium property management, brokerage, and facility services across the Sultanate of Oman.",
    the_face_of_trust: '"The Face of Trust."',
    quick_links: "Quick Links",
    newsletter: "Newsletter",
    newsletter_desc: "Subscribe to receive updates on premium properties.",
    subscribe: "Subscribe",
    email_placeholder: "Your email address",
    all_rights_reserved: "All Rights Reserved.",
    privacy_policy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    
    // Upcoming Projects
    upcoming_onyx_title: "The Onyx Residences",
    upcoming_onyx_type: "Luxury Apartments",
    upcoming_tower_title: "RPM Corporate Tower",
    upcoming_tower_type: "Commercial Spaces",
    upcoming_careers_title: "Join Our Team",
    upcoming_careers_type: "Careers",
    
    // Service Features
    tenant_screening: "Tenant Screening",
    rent_collection: "Rent Collection",
    financial_reporting: "Financial Reporting",
    lease_administration: "Lease Administration",
    property_valuation: "Property Valuation",
    investment_advisory: "Investment Advisory",
    market_analysis: "Market Analysis",
    negotiation_support: "Negotiation Support",
    preventative_maintenance: "Preventative Maintenance",
    security_services: "Security Services",
    energy_management: "Energy Management",
    vendor_coordination: "Vendor Coordination",
    deep_cleaning: "Deep Cleaning",
    hvac_maintenance: "HVAC Maintenance",
    plumbing_electrical: "Plumbing & Electrical",
    emergency_support: "24/7 Emergency Support",
    
    // Contact
    get_in_touch: "Get In Touch",
    contact_title: "Contact Us",
    contact_desc: "Connect with our experts to discuss your premium real estate requirements in the Sultanate of Oman.",
    office_hq: "Office Headquarters",
    location: "Location",
    direct_lines: "Direct Lines",
    email_access: "Email Access",
    send_message: "Send a Message",
    full_name: "Full Name",
    phone_number: "Phone Number",
    subject_interest: "Subject of Interest",
    your_message: "Your Message",
    submit_inquiry: "Submit Inquiry",
    visit_office: "Visit our corporate office to discuss your real estate portfolio with our dedicated consultants.",
    get_directions: "Get Directions",
  },
  AR: {
    // Nav
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    properties: "العقارات",
    contact: "اتصل بنا",
    inquire_now: "استفسر الآن",
    
    // Hero
    hero_title: "بوابتكم إلى",
    hero_title_gradient: "حلول عقارية موثوقة",
    hero_title_end: "",
    hero_desc: "إدارة العقارات المتميزة، والوساطة، وإدارة المرافق، وخدمات الصيانة في مسقط، سلطنة عمان.",
    explore_properties: "استكشف العقارات",
    contact_us: "اتصل بنا",
    featured: "مميز",
    scroll: "مرر للأسفل",
    
    // Stats
    managed_properties: "عقارات مدارة",
    satisfied_clients: "عملاء راضون",
    years_experience: "سنوات خبرة",
    professionals: "متخصصون",
    
    // Services
    our_expertise: "خبراتنا",
    comprehensive_services: "خدمات عقارية شاملة",
    view_all_services: "عرض جميع الخدمات",
    service_mgmt_title: "إدارة العقارات",
    service_mgmt_desc: "إدارة شاملة لتحقيق عوائد مثالية.",
    service_brokerage_title: "الوساطة العقارية",
    service_brokerage_desc: "توجيه خبير في البيع والشراء.",
    service_facility_title: "إدارة المرافق",
    service_facility_desc: "الحفاظ على قيمة الأصول ووظائفها.",
    service_maintenance_title: "الصيانة والنظافة",
    service_maintenance_desc: "صيانة ممتازة للمعايير الفاخرة.",
    
    // Properties
    exclusive_portfolio: "محفظة حصرية",
    featured_properties: "عقارات مميزة",
    view_all_props: "عرض جميع العقارات",
    for_sale: "للبيع",
    for_rent: "للإيجار",
    beds: "غرف",
    area: "مساحة",
    view_details: "عرض التفاصيل",
    
    // Upcoming
    future_vision: "رؤية مستقبلية",
    upcoming_projects: "مشاريع قادمة",
    coming_soon: "قريباً",
    in_development: "قيد التطوير",
    vacancies: "عرض الوظائف الشاغرة",
    
    // About
    corporate_overview: "نظرة عامة على الشركة",
    about_title: "ريادة العقارات الفاخرة في عمان",
    about_desc: "نحن نقدم تجارب مؤسسية بمستوى المستثمرين من خلال إدارة العقارات المتميزة والوساطة وخدمات المرافق النخبوية.",
    legacy_title: "إرثنا من التميز",
    legacy_desc1: "تأسست شركة ريل العقارية (RPM) في قلب مسقط، ونمت لتصبح علامة تجارية فاخرة بمليارات الدولارات. نحن نعيد تعريف المشهد العقاري في سلطنة عمان من خلال جسر تطلوات المستثمرين مع عقارات عالمية المستوى ذات عوائد عالية.",
    legacy_desc2: "التزامنا يتجاوز المعاملات البسيطة. نحن نبني علاقات دائمة، ونحافظ على أعلى مستويات الثقة والشفافية والتقدير المعماري. نحن فخورون بأن نكون وجه الثقة في سوق العقارات المزدهر في عمان.",
    vision: "رؤيتنا",
    vision_desc: "أن نكون الشريك العقاري الأكثر رقيًا وطلباً في دول مجلس التعاون الخليجي، وتحديد مستقبل الحياة الفاخرة والبنية التحتية للشركات في جميع أنحاء سلطنة عمان.",
    mission: "مهمتنا",
    mission_desc: "تقديم خدمات إدارة العقارات والوساطة التي لا تضاهى من خلال حلول مبتكرة، وصيانة دقيقة للمرافق، وتفاني لا يتزعزع لنجاح العميل ورضاه.",
    leadership: "القيادة",

    // Footer
    footer_desc: "بوابتكم إلى حلول عقارية موثوقة. نقدم خدمات إدارة العقارات المتميزة، والوساطة، وإدارة المرافق في جميع أنحاء سلطنة عمان.",
    the_face_of_trust: '"وجه الثقة."',
    quick_links: "روابط سريعة",
    newsletter: "النشرة الإخبارية",
    newsletter_desc: "اشترك لتلقي تحديثات حول العقارات المتميزة.",
    subscribe: "اشتراك",
    email_placeholder: "عنوان بريدك الإلكتروني",
    all_rights_reserved: "جميع الحقوق محفوظة.",
    privacy_policy: "سياسة الخصوصية",
    terms_of_service: "شروط الخدمة",

    // Upcoming Projects
    upcoming_onyx_title: "ذا أونيكس ريزيدنس",
    upcoming_onyx_type: "شقق فاخرة",
    upcoming_tower_title: "برج آر بي إم للشركات",
    upcoming_tower_type: "مساحات تجارية",
    upcoming_careers_title: "انضم إلى فريقنا",
    upcoming_careers_type: "وظائف",

    // Service Features
    tenant_screening: "فحص المستأجرين",
    rent_collection: "تحصيل الإيجارات",
    financial_reporting: "التقارير المالية",
    lease_administration: "إدارة عقود الإيجار",
    property_valuation: "تثمين العقارات",
    investment_advisory: "استشارات استثمارية",
    market_analysis: "تحليل السوق",
    negotiation_support: "دعم التفاوض",
    preventative_maintenance: "الصيانة الوقائية",
    security_services: "الخدمات الأمنية",
    energy_management: "إدارة الطاقة",
    vendor_coordination: "تنسيق الموردين",
    deep_cleaning: "التنظيف العميق",
    hvac_maintenance: "صيانة التكييف",
    plumbing_electrical: "السباكة والكهرباء",
    emergency_support: "دعم طوارئ 24/7",

    // Contact
    get_in_touch: "تواصل معنا",
    contact_title: "اتصل بنا",
    contact_desc: "تواصل مع خبرائنا لمناقشة متطلباتك العقارية المتميزة في سلطنة عمان.",
    office_hq: "المقر الرئيسي للمكتب",
    location: "الموقع",
    direct_lines: "الخطوط المباشرة",
    email_access: "البريد الإلكتروني",
    send_message: "أرسل رسالة",
    full_name: "الاسم الكامل",
    phone_number: "رقم الهاتف",
    subject_interest: "موضوع الاهتمام",
    your_message: "رسالتك",
    submit_inquiry: "إرسال الاستفسار",
    visit_office: "تفضل بزيارة مكتبنا لمناقشة محفظتك العقارية مع مستشارينا المخصصين.",
    get_directions: "احصل على الاتجاهات",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("EN");

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations["EN"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === "AR" ? "rtl" : "ltr"} className={lang === "AR" ? "font-serif-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
