import { useTranslation } from "react-i18next";

export default function GallerySection() {
  const { t } = useTranslation();

  // Vygeneruj pole 13 obrázků
  const images = Array.from({ length: 13 }, (_, i) => `sax_foto_${i + 1}.jpg`);

  return (
    <section id="gallery" className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">
          {t("gallery.title")}
        </h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105"
            >
              <img
                src={`/images/gallery/${img}`}
                alt={`sax-gallery-${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
