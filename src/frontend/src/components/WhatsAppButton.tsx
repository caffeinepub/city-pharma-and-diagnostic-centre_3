import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919931918438"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-[oklch(0.65_0.19_142)] opacity-30 pulse-ring" />
      <span
        className="absolute inset-0 rounded-full bg-[oklch(0.65_0.19_142)] opacity-20 pulse-ring"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Button */}
      <motion.div
        className="relative w-14 h-14 rounded-full bg-[oklch(0.55_0.19_142)] shadow-lg flex items-center justify-center text-white whatsapp-animate"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: "0 4px 24px oklch(0.55 0.19 142 / 0.5)",
        }}
      >
        <SiWhatsapp className="w-7 h-7" />
      </motion.div>

      {/* Tooltip */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[oklch(0.15_0.003_240)] text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/10 pointer-events-none">
        Chat on WhatsApp
      </div>
    </a>
  );
}
