import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  // Změna jazyka
  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
<header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md text-white shadow-md">
  {/* Navbar */}
  <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
    
    {/* Klikací logo/jméno */}
    <a href="#hero" className="text-xl font-bold hover:text-green-400 transition">
      Adam Nukorev
    </a>

    {/* Navigace */}
    <nav className="space-x-4 hidden md:flex">
      <a href="#about" className="hover:text-green-400 transition duration-200">
        {t("nav.about")}
      </a>
      <a href="#music" className="hover:text-green-400 transition duration-200">
        {t("nav.music")}
      </a>
      <a href="#gallery" className="hover:text-green-400 transition duration-200">
        {t("nav.gallery")}
      </a>
      <a href="#contact" className="hover:text-green-400 transition duration-200">
        {t("nav.contact")}
      </a>
    </nav>

    {/* Přepínač jazyka */}
    <select
      onChange={changeLang}
      value={i18n.language}
      className="bg-gray-800 text-white text-sm px-2 py-1 rounded ml-4"
    >
      <option value="ru">RU</option>
      <option value="en">EN</option>
      <option value="de">DE</option>
    </select>
  </div>
</header>

  );
}
