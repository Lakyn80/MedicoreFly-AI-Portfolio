import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-center bg-no-repeat bg-fixed bg-cover flex items-center justify-center text-white px-4"
      style={{ backgroundImage: "url('/images/adam-sax.jpg')" }}
    >
      {/* Tmavý průhledný overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text v popředí */}
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          {t("hero.name")}
        </h1>
        <p className="text-xl md:text-2xl mb-6">{t("hero.title")}</p>
      </div>
    </section>
  );
}
