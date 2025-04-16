import { useTranslation } from "react-i18next";
import { FaVk, FaTiktok, FaTelegramPlane } from "react-icons/fa";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 bg-black bg-opacity-80 backdrop-blur-md text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo / jméno */}
        <a
          href="#hero"
          className="text-xl font-bold hover:text-green-400 transition"
        >
          Adam Nukorev
        </a>

        {/* Navigace */}
        <nav className="space-x-4 hidden md:flex">
          <a
            href="#about"
            className="hover:text-green-400 transition duration-200"
          >
            {t("nav.about")}
          </a>
          <a
            href="#music"
            className="hover:text-green-400 transition duration-200"
          >
            {t("nav.music")}
          </a>
          <a
            href="#gallery"
            className="hover:text-green-400 transition duration-200"
          >
            {t("nav.gallery")}
          </a>
          <a
            href="#contact"
            className="hover:text-green-400 transition duration-200"
          >
            {t("nav.contact")}
          </a>
        </nav>

        {/* Ikony + jazyk */}
        <div className="flex items-center space-x-4">
          {/* VK */}
          <a
            href="https://vk.com/m3dic0r3_fly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-blue-400"
            title="VK"
          >
            <FaVk />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@mfly6f1?_t=ZS-8vXGS2jA1BQ&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-pink-400"
            title="TikTok"
          >
            <FaTiktok />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/mfly6f1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl hover:text-cyan-400"
            title="Telegram"
          >
            <FaTelegramPlane />
          </a>

          {/* Přepínač jazyka */}
          <select
            onChange={changeLang}
            value={i18n.language}
            className="bg-gray-800 text-white text-sm px-2 py-1 rounded"
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
            <option value="de">DE</option>
          </select>
        </div>
      </div>
    </header>
  );
}
