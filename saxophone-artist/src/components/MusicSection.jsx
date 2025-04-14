import { useTranslation } from "react-i18next";

export default function MusicSection() {
  const { t } = useTranslation();

  return (
    <section id="music" className="bg-gray-950 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        {/* Nadpis a popis */}
        <h2 className="text-4xl font-bold mb-6">{t("music.title")}</h2>
        <p className="text-lg mb-8 opacity-80">{t("music.description")}</p>

        {/* YouTube video */}
        <div className="aspect-video mb-8 max-w-3xl mx-auto">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/JDw0mKZA7Oo"
            title="YouTube player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
