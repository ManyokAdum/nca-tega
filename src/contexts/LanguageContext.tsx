import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "din" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.about": "About",
        "nav.organization": "Organization",
        "nav.leadership": "Leadership",
        "nav.governance": "Governance",
        "nav.membership": "Membership",
        "nav.events": "Events",
        "nav.elections": "Elections",
        "nav.upcomingEvents": "Upcoming Events",
        "nav.pastEvents": "Past Events",
        "nav.documents": "Documents",
        "nav.contact": "Contact",
        "nav.donate": "Donate",
        // Logo
        "logo.title": "Twic East Girls' Association",
        "logo.subtitle": "Nyan Cit Arialbeek",
    },
    din: {
        // Navigation
        "nav.home": "Pan",
        "nav.about": "Kuɛɛl",
        "nav.organization": "Kɔc",
        "nav.leadership": "Kuɛɛl",
        "nav.governance": "Kuɛɛl",
        "nav.membership": "Kuɛɛl",
        "nav.events": "Kuɛɛl",
        "nav.elections": "Kuɛɛl",
        "nav.upcomingEvents": "Kuɛɛl",
        "nav.pastEvents": "Kuɛɛl",
        "nav.documents": "Kuɛɛl",
        "nav.contact": "Kuɛɛl",
        "nav.donate": "Kuɛɛl",
        // Logo
        "logo.title": "Twic East Girls' Association",
        "logo.subtitle": "Nyan Cit Arialbeek",
    },
    ar: {
        // Navigation
        "nav.home": "الرئيسية",
        "nav.about": "من نحن",
        "nav.organization": "المنظمة",
        "nav.leadership": "القيادة",
        "nav.governance": "الحوكمة",
        "nav.membership": "العضوية",
        "nav.events": "الفعاليات",
        "nav.elections": "الانتخابات",
        "nav.upcomingEvents": "الفعاليات القادمة",
        "nav.pastEvents": "الفعاليات السابقة",
        "nav.documents": "الوثائق",
        "nav.contact": "اتصل بنا",
        "nav.donate": "تبرع",
        // Logo
        "logo.title": "رابطة فتيات تويق إيست",
        "logo.subtitle": "نيان سيت أريالبيك",
    },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        // Get from localStorage or default to English
        const saved = localStorage.getItem("nca_language") as Language;
        return saved && ["en", "din", "ar"].includes(saved) ? saved : "en";
    });

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem("nca_language", language);
        
        // Update document direction for RTL languages
        if (language === "ar") {
            document.documentElement.setAttribute("dir", "rtl");
            document.documentElement.setAttribute("lang", "ar");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
            document.documentElement.setAttribute("lang", language);
        }
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string): string => {
        return translations[language]?.[key] || translations.en[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
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

