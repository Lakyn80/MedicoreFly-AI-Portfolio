import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{t("about.title")}</h2>
        <p className="text-lg leading-relaxed opacity-90">{t("about.text")}</p>
      </div>
    </section>
  );
}
