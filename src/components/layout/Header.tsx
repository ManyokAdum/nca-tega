import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ncaLogo from "@/images/final-logo.png";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

const languages = [
  { code: "en" as Language, name: "English" },
  { code: "din" as Language, name: "Thuɔŋjäŋ" },
  { code: "ar" as Language, name: "العربية" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Prevent body scroll when mobile menu is open
  if (typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  const navigation = [
    { name: t("nav.home"), href: "/", key: "home" },
    { name: t("nav.about"), href: "/about", key: "about" },
    {
      name: t("nav.organization"),
      key: "organization",
      children: [
        { name: t("nav.leadership"), href: "/leadership", key: "leadership" },
        { name: t("nav.governance"), href: "/governance", key: "governance" },
        { name: t("nav.membership"), href: "/membership", key: "membership" },
      ],
    },
    {
      name: t("nav.events"),
      key: "events",
      children: [
        { name: t("nav.elections"), href: "/elections", key: "elections" },
        { name: t("nav.upcomingEvents"), href: "/events/upcoming", key: "upcoming" },
        { name: t("nav.pastEvents"), href: "/events/past", key: "past" },
      ],
    },
    { name: t("nav.documents"), href: "/documents", key: "documents" },
    { name: t("nav.contact"), href: "/contact", key: "contact" },
  ];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src={ncaLogo}
            alt="NCAA Logo"
            className="h-10 sm:h-12 w-auto object-contain"
          />
          {/* Compact text for small screens */}
          <div className="block sm:hidden">
            <p className="font-heading text-sm font-bold leading-tight text-foreground whitespace-nowrap">
              TEGA-NCAA
            </p>
          </div>
          {/* Full text for larger screens */}
          <div className="hidden sm:block">
            <p className="font-heading text-lg font-bold leading-tight text-foreground">
              {t("logo.title")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("logo.subtitle")}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.key}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem asChild key={child.key}>
                      <Link to={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.key}
                to={item.href!}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector - Desktop */}
          <div className="relative hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs uppercase">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      language === lang.code && "bg-accent"
                    )}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Language Selector - Mobile (in header bar) */}
          <div className="relative block lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 h-9 px-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "cursor-pointer",
                      language === lang.code && "bg-accent"
                    )}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden gap-2 md:flex">
            <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/donate" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {t("nav.donate")}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileNavRef}
        className={cn(
          "overflow-y-auto border-t border-border/40 bg-background transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[calc(100vh-4rem)]" : "max-h-0"
        )}
      >
        <nav className="container flex flex-col gap-1 py-4">
          {navigation.map((item) =>
            item.children ? (
              <DropdownMenu key={item.key}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[calc(100vw-3rem)]">
                  {item.children.map((child) => (
                    <DropdownMenuItem asChild key={child.key}>
                      <Link
                        to={child.href}
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        {child.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.key}
                to={item.href!}
                className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            <Button variant="default" className="w-full" asChild>
              <Link to="/donate" className="flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
                <Heart className="h-4 w-4" />
                {t("nav.donate")}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
