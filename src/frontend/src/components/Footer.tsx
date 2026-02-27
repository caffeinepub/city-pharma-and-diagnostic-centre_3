import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Cross, Heart } from "lucide-react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/medicines", label: "Medicine Services" },
  { to: "/pathology", label: "Pathology Services" },
  { to: "/ultrasound", label: "Ultrasound Services" },
  { to: "/doctors", label: "Doctor Consultation" },
  { to: "/contact", label: "Contact Us" },
  { to: "/login", label: "Customer Login" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : ""
  );

  return (
    <footer className="bg-[oklch(0.07_0_0)] border-t border-white/5 mt-auto">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[oklch(0.537_0.207_25.1)] flex items-center justify-center">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm tracking-wide">
                  CITY PHARMA
                </div>
                <div className="text-[10px] text-[oklch(0.5_0.005_240)] tracking-wider">
                  & DIAGNOSTIC CENTRE
                </div>
              </div>
            </div>
            <p className="text-sm text-[oklch(0.55_0.006_240)] leading-relaxed">
              Your trusted healthcare partner in Bundu Panch Pargana.
              Quality medicines, pathology, ultrasound & specialist consultations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919931918438"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[oklch(0.537_0.207_25.1/0.15)] flex items-center justify-center text-[oklch(0.537_0.207_25.1)] hover:bg-[oklch(0.537_0.207_25.1/0.3)] transition-colors"
                aria-label="WhatsApp"
              >
                <SiWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 pb-2 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[oklch(0.55_0.006_240)] hover:text-[oklch(0.65_0.18_25.1)] transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[oklch(0.537_0.207_25.1/0.4)] group-hover:bg-[oklch(0.537_0.207_25.1)] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 pb-2 border-b border-white/10">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex gap-2.5 text-sm">
                <MapPin className="w-4 h-4 text-[oklch(0.537_0.207_25.1)] shrink-0 mt-0.5" />
                <span className="text-[oklch(0.55_0.006_240)] leading-relaxed">
                  Near College More Bundu, Opposite Bank of Baroda, NH-33, Bundu, Jharkhand – 835204
                </span>
              </div>
              <a
                href="tel:9931918438"
                className="flex items-center gap-2.5 text-sm text-[oklch(0.55_0.006_240)] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                9931918438
              </a>
              <a
                href="tel:7004655571"
                className="flex items-center gap-2.5 text-sm text-[oklch(0.55_0.006_240)] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[oklch(0.537_0.207_25.1)]" />
                7004655571
              </a>
              <a
                href="mailto:citypharmanavdurga@gmail.com"
                className="flex items-center gap-2.5 text-sm text-[oklch(0.55_0.006_240)] hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[oklch(0.537_0.207_25.1)] shrink-0" />
                citypharmanavdurga@gmail.com
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm mb-4 pb-2 border-b border-white/10">
              Working Hours
            </h3>
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[oklch(0.537_0.207_25.1)] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-white font-medium">All Days</p>
                <p className="text-sm text-[oklch(0.55_0.006_240)]">8:00 AM – 8:00 PM</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[oklch(0.537_0.207_25.1/0.1)] border border-[oklch(0.537_0.207_25.1/0.2)]">
              <p className="text-xs text-[oklch(0.65_0.18_25.1)] font-medium">
                🟢 Open Today
              </p>
              <p className="text-xs text-[oklch(0.55_0.006_240)] mt-0.5">
                We're here for your healthcare needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[oklch(0.4_0.005_240)]">
          <p>
            © {year} City Pharma and Diagnostic Centre. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[oklch(0.537_0.207_25.1)]" /> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[oklch(0.537_0.207_25.1)] hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
