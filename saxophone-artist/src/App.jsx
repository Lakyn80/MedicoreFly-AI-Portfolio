import React from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import MusicSection from "./components/MusicSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Navbar />
      <Hero />
      <AboutSection />
      <MusicSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}
