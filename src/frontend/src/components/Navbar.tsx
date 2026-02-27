import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Phone,
  Mail,
  Cross,
  Pill,
  Microscope,
  Activity,
  UserRound,
  LogIn,
  MapPin,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home", icon: Cross },
  { to: "/medicines", label: "Medicines", icon: Pill },
  { to: "/pathology", label: "Pathology", icon: Microscope },
  { to: "/ultrasound", label: "Ultrasound", icon: Activity },
  { to: "/doctors", label: "Doctors", icon: UserRound },
  { to: "/contact", label: "Contact", icon: MapPin },
  { to: "/login", label: "Login", icon: LogIn },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    // pathname change causes mobile menu close
  });

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top contact strip */}
      <div className="bg-[oklch(0.537_0.207_25.1)] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-1">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:9931918438"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-3 h-3" />
              <span>9931918438</span>
            </a>
            <a
              href="tel:7004655571"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-3 h-3" />
              <span>7004655571</span>
            </a>
            <a
              href="mailto:citypharmanavdurga@gmail.com"
              className="hidden sm:flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Mail className="w-3 h-3" />
              <span>citypharmanavdurga@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3" />
            <span className="font-medium">English</span>
            <span className="opacity-60">|</span>
            <span className="opacity-70 cursor-not-allowed">हिन्दी</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={cn(
          "w-full transition-all duration-300",
          scrolled
            ? "bg-[oklch(0.09_0_0/0.97)] backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/5"
            : "bg-[oklch(0.09_0_0/0.95)] backdrop-blur-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-[oklch(0.537_0.207_25.1)] flex items-center justify-center shadow-red-sm group-hover:shadow-red-md transition-shadow">
                  <Cross className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-display font-bold text-white text-sm tracking-wide">
                  CITY PHARMA
                </div>
                <div className="text-[10px] text-[oklch(0.6_0.008_240)] font-medium tracking-wider">
                  & DIAGNOSTIC CENTRE
                </div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                      isActive
                        ? "text-white bg-[oklch(0.537_0.207_25.1/0.2)]"
                        : "text-[oklch(0.75_0.008_240)] hover:text-white hover:bg-white/5"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-md bg-[oklch(0.537_0.207_25.1/0.15)] border border-[oklch(0.537_0.207_25.1/0.3)]"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[oklch(0.537_0.207_25.1)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-[oklch(0.11_0_0)]"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.to;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.to}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-[oklch(0.537_0.207_25.1/0.2)] text-white border border-[oklch(0.537_0.207_25.1/0.3)]"
                            : "text-[oklch(0.75_0.008_240)] hover:text-white hover:bg-white/5"
                        )}
                      >
                        <Icon className={cn("w-4 h-4", isActive ? "text-[oklch(0.65_0.18_25.1)]" : "")} />
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-2 pb-1 px-3 border-t border-white/10 mt-2">
                  <div className="flex flex-col gap-1 text-xs text-[oklch(0.5_0.005_240)]">
                    <a href="tel:9931918438" className="flex items-center gap-2 hover:text-white transition-colors">
                      <Phone className="w-3 h-3" /> 9931918438
                    </a>
                    <a href="tel:7004655571" className="flex items-center gap-2 hover:text-white transition-colors">
                      <Phone className="w-3 h-3" /> 7004655571
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
