import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence } from "motion/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import HomePage from "./pages/HomePage";
import MedicinePage from "./pages/MedicinePage";
import PathologyPage from "./pages/PathologyPage";
import UltrasoundPage from "./pages/UltrasoundPage";
import DoctorsPage from "./pages/DoctorsPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return null;
}

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/medicines" element={<MedicinePage />} />
            <Route path="/pathology" element={<PathologyPage />} />
            <Route path="/ultrasound" element={<UltrasoundPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
