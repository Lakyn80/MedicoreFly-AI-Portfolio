import { useTranslation } from "react-i18next";

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="scroll-mt-24 max-w-3xl mx-auto px-6 py-12 text-neutral-800 dark:text-white leading-relaxed font-[Inter]"
    >
      {/* Nadpis */}
      <h2 className="text-4xl font-bold font-[Cinzel] tracking-wide mb-6 text-center text-amber-700 dark:text-amber-400 drop-shadow">
        {t("about.title")}
      </h2>

      {/* Text část 1 */}
      <p className="mb-4 text-lg font-medium">{t("about.text.part1")}</p>

      {/* Seznam žánrů */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 text-base">
        <li>🎷 Groove Funk</li>
        <li>🎼 Jazz Standard</li>
        <li>🌪️ Acid Jazz</li>
        <li>🛋️ Lounge</li>
        <li>💜 RnB</li>
        <li>🌆 City Pop</li>
        <li>🎸 Blues</li>
        <li>➕ {t("about.text.and_more")}</li>
      </ul>

      {/* Text část 2 */}
      <p className="mb-4">{t("about.text.part2")}</p>

      {/* Text část 3 */}
      <p className="mb-4">{t("about.text.part3")}</p>

      {/* Mise */}
      <p className="mt-6 text-center font-medium text-xl italic text-emerald-700 dark:text-emerald-400">
        {t("about.text.mission")}
      </p>
    </section>
  );
}
