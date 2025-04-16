import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageModal from "./ImageModal";

export default function GallerySection() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);

  const images = Array.from(
    { length: 13 },
    (_, i) => `/images/gallery/sax_foto_${i + 1}.jpg`
  );

  const openModal = (src) => setSelectedImage(src);
  const closeModal = () => setSelectedImage(null);

  return (
    <section
      id="gallery"
      className="scroll-mt-24 px-6 py-12 bg-black text-white"
    >
      <h2 className="text-4xl font-bold text-center text-amber-500 mb-10 font-[Cinzel]">
        {t("gallery.title")}
      </h2>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        <div className="flex gap-4 w-max">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => openModal(src)}
              className="relative w-[280px] h-[400px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer group"
            >
              <img
                src={src}
                alt={t("gallery.photo_label", { number: index + 1 })}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <ImageModal
        isOpen={!!selectedImage}
        imageSrc={selectedImage}
        onClose={closeModal}
      />
    </section>
  );
}
