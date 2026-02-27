import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Pill,
  Microscope,
  Activity,
  UserRound,
  ArrowRight,
  Shield,
  Award,
  Home,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ECG waveform SVG path
const ECG_PATH =
  "M0,50 L40,50 L45,50 L50,20 L55,80 L60,50 L80,50 L85,50 L90,35 L95,65 L100,50 L140,50 L145,50 L150,10 L155,90 L160,50 L200,50 L205,50 L210,30 L215,70 L220,50 L260,50 L265,50 L270,15 L275,85 L280,50 L320,50 L325,50 L330,25 L335,75 L340,50 L380,50 L385,50 L390,20 L395,80 L400,50 L440,50 L445,50 L450,10 L455,90 L460,50 L500,50";

const services = [
  {
    icon: Pill,
    title: "Medicine Services",
    description: "Branded & generic medicines with FREE home delivery within 20 km. 50+ medicines in stock.",
    badge: "FREE HOME DELIVERY",
    badgeColor: "oklch(0.65 0.15 142 / 0.15)",
    badgeTextColor: "oklch(0.7 0.15 142)",
    cta: "Book Medicines",
    to: "/medicines",
    accent: "oklch(0.537 0.207 25.1)",
  },
  {
    icon: Microscope,
    title: "Pathology Services",
    description: "Comprehensive lab testing with 80+ tests. Home sample collection available.",
    badge: "80+ Tests Available",
    badgeColor: "oklch(0.37 0.18 264.4 / 0.15)",
    badgeTextColor: "oklch(0.6 0.14 264.4)",
    cta: "Book Tests",
    to: "/pathology",
    accent: "oklch(0.37 0.18 264.4)",
  },
  {
    icon: Activity,
    title: "Ultrasound Services",
    description: "Advanced imaging with experienced sonographers. Safe & accurate results.",
    badge: "Advanced Imaging",
    badgeColor: "oklch(0.55 0.15 60 / 0.15)",
    badgeTextColor: "oklch(0.7 0.15 60)",
    cta: "Book Ultrasound",
    to: "/ultrasound",
    accent: "oklch(0.537 0.207 25.1)",
  },
  {
    icon: UserRound,
    title: "Doctor Consultation",
    description: "10+ specialist doctors visiting regularly. Affordable consultation fees.",
    badge: "10+ Specialists",
    badgeColor: "oklch(0.55 0.15 300 / 0.15)",
    badgeTextColor: "oklch(0.65 0.12 300)",
    cta: "Book Appointment",
    to: "/doctors",
    accent: "oklch(0.37 0.18 264.4)",
  },
];

const stats = [
  { value: "10+", label: "Specialist Doctors" },
  { value: "80+", label: "Lab Tests" },
  { value: "FREE", label: "Home Delivery" },
  { value: "365", label: "Days Open" },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "NABL Certified Lab",
    description: "Our pathology lab follows strict quality standards for accurate results",
  },
  {
    icon: Award,
    title: "Experienced Doctors",
    description: "10+ specialist doctors with decades of combined expertise",
  },
  {
    icon: Star,
    title: "Affordable Prices",
    description: "Best quality healthcare at prices accessible to all",
  },
  {
    icon: Home,
    title: "Home Sample Collection",
    description: "We collect samples at your doorstep for your convenience",
  },
  {
    icon: Clock,
    title: "Open All Days",
    description: "Available 8 AM to 8 PM, 365 days including holidays",
  },
  {
    icon: Activity,
    title: "Quick Reports",
    description: "Fast turnaround time for most tests with digital delivery",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center overflow-hidden hero-bg"
      >
        {/* ECG Background Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-25">
          <div className="ecg-scroll flex" style={{ width: "200%" }}>
            {[0, 1].map((k) => (
              <svg
                key={k}
                viewBox="0 0 500 100"
                preserveAspectRatio="none"
                className="w-full"
                style={{ height: "100px", minWidth: "50%" }}
                aria-hidden="true"
                role="presentation"
              >
                  <path
                    d={ECG_PATH}
                    fill="none"
                    stroke="oklch(0.537 0.207 25.1)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    filter={`url(#ecg-glow-${k})`}
                  />
                <defs>
                  <filter id={`ecg-glow-${k}`}>
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            ))}
          </div>
        </div>

        {/* Floating medical icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="float-1 absolute top-[15%] left-[8%] text-[oklch(0.537_0.207_25.1/0.35)]">
            <Pill className="w-10 h-10 md:w-14 md:h-14" />
          </div>
          <div className="float-2 absolute top-[25%] right-[10%] text-[oklch(0.37_0.18_264.4/0.3)]">
            <Microscope className="w-8 h-8 md:w-12 md:h-12" />
          </div>
          <div className="float-3 absolute bottom-[30%] left-[15%] text-[oklch(0.537_0.207_25.1/0.2)]">
            <Activity className="w-12 h-12 md:w-16 md:h-16" />
          </div>
          <div className="float-4 absolute top-[60%] right-[8%] text-[oklch(0.37_0.18_264.4/0.25)]">
            <UserRound className="w-8 h-8 md:w-12 md:h-12" />
          </div>
          <div className="float-5 absolute top-[45%] left-[5%] text-[oklch(0.537_0.207_25.1/0.15)]">
            <Shield className="w-6 h-6 md:w-10 md:h-10" />
          </div>
        </div>

        {/* Red decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[oklch(0.537_0.207_25.1/0.05)] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[oklch(0.37_0.18_264.4/0.05)] blur-3xl pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.537_0.207_25.1/0.1)] border border-[oklch(0.537_0.207_25.1/0.3)] text-sm text-[oklch(0.65_0.18_25.1)] font-medium mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[oklch(0.537_0.207_25.1)] animate-pulse" />
              Bundu Panch Pargana's Trusted Healthcare Centre
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
            >
              CITY PHARMA{" "}
              <span className="red-gradient-text block sm:inline">
                & DIAGNOSTIC
              </span>{" "}
              CENTRE
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[oklch(0.7_0.008_240)] mb-8 leading-relaxed max-w-2xl"
            >
              Your Trusted Healthcare Partner in Bundu Panch Pargana.
              Medicines, Pathology, Ultrasound & Specialist Doctors — all under one roof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                className="bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white font-semibold px-6 py-2.5 rounded-lg shadow-red-md"
              >
                <Link to="/pathology">
                  Book Lab Tests <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-6 py-2.5 rounded-lg bg-white/5"
              >
                <Link to="/doctors">
                  Book Doctor <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Quick contact */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-sm text-[oklch(0.55_0.006_240)]"
            >
              <span className="flex items-center gap-1.5">
                <span className="text-[oklch(0.537_0.207_25.1)]">📞</span>
                <a href="tel:9931918438" className="hover:text-white transition-colors">9931918438</a>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[oklch(0.537_0.207_25.1)]">📞</span>
                <a href="tel:7004655571" className="hover:text-white transition-colors">7004655571</a>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[oklch(0.537_0.207_25.1)]">🕐</span>
                8 AM – 8 PM, All Days
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-9 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full bg-[oklch(0.537_0.207_25.1)]"
            />
          </div>
        </motion.div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-[oklch(0.537_0.207_25.1)] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item}>
                <div className="font-display font-bold text-3xl text-white">{stat.value}</div>
                <div className="text-sm text-white/80 font-medium mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICE CARDS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[oklch(0.537_0.207_25.1)] text-sm font-semibold tracking-widest uppercase mb-2">
            Our Services
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Complete Healthcare Under One Roof
          </h2>
          <p className="text-[oklch(0.6_0.008_240)] max-w-xl mx-auto">
            From medicines to advanced diagnostics, we provide comprehensive healthcare services for the entire family.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="h-full bg-[oklch(0.12_0.002_240)] rounded-xl border border-[oklch(0.22_0.004_240)] overflow-hidden card-hover-glow transition-all duration-300">
                  {/* Top accent line */}
                  <div
                    className="h-0.5 w-full"
                    style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }}
                  />
                  <div className="p-5">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${service.accent}1a` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.accent }} />
                    </div>

                    {/* Badge */}
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 border"
                      style={{
                        background: service.badgeColor,
                        color: service.badgeTextColor,
                        borderColor: service.badgeColor,
                      }}
                    >
                      {service.badge}
                    </span>

                    <h3 className="font-heading font-bold text-white text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-[oklch(0.55_0.006_240)] leading-relaxed mb-4">
                      {service.description}
                    </p>

                    <Button
                      asChild
                      size="sm"
                      className="w-full text-white font-medium group-hover:shadow-red-sm transition-shadow"
                      style={{ background: service.accent }}
                    >
                      <Link to={service.to}>
                        {service.cta}
                        <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-[oklch(0.11_0.001_240)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[oklch(0.537_0.207_25.1)] text-sm font-semibold tracking-widest uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              Healthcare You Can Trust
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {whyChooseUs.map((item_) => {
              const Icon = item_.icon;
              return (
                <motion.div
                  key={item_.title}
                  variants={item}
                  className="flex gap-4 p-5 rounded-xl bg-[oklch(0.13_0.002_240)] border border-[oklch(0.22_0.004_240)] hover:border-[oklch(0.537_0.207_25.1/0.3)] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.537_0.207_25.1/0.1)] flex items-center justify-center shrink-0 group-hover:bg-[oklch(0.537_0.207_25.1/0.2)] transition-colors">
                    <Icon className="w-5 h-5 text-[oklch(0.537_0.207_25.1)]" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-white mb-1">{item_.title}</h4>
                    <p className="text-sm text-[oklch(0.55_0.006_240)]">{item_.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-2xl bg-[oklch(0.12_0.002_240)] border border-[oklch(0.537_0.207_25.1/0.2)] relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[oklch(0.537_0.207_25.1/0.05)] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[oklch(0.37_0.18_264.4/0.05)] rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                Need Healthcare Assistance?
              </h2>
              <p className="text-[oklch(0.6_0.008_240)] mb-8 text-lg">
                Call us now or visit us at Near College More, Bundu, NH-33
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.48_0.207_25.1)] text-white shadow-red-md font-semibold px-8"
                >
                  <a href="tel:9931918438">
                    📞 Call: 9931918438
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8"
                >
                  <Link to="/contact">Get Directions</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
