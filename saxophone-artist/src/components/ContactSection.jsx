import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{t("contact.title")}</h2>
        <p className="mb-8 text-lg opacity-80">{t("contact.description")}</p>

        {submitted ? (
          <div className="text-green-500 text-xl">{t("contact.success")}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.email")}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
            />
            <textarea
              name="message"
              placeholder={t("contact.message")}
              required
              rows="5"
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white transition"
            >
              {t("contact.submit")}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
