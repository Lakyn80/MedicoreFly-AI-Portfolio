import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang: i18n.language }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <section id="contact" className="bg-black text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">{t("contact.title")}</h2>
        <p className="mb-8 text-lg opacity-80">{t("contact.description")}</p>

        {submitted ? (
          <div className="text-green-500 text-xl mb-4">
            {t("contact.success")}
            <br />
            <span className="text-sm opacity-70">
              (Форма появится снова через 5 секунд)
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
            />
            <input
              type="email"
              name="email"
              placeholder={t("contact.email")}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 text-white rounded"
            />
            <textarea
              name="message"
              placeholder={t("contact.message")}
              value={formData.message}
              onChange={handleChange}
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

        {error && <div className="text-red-500 text-sm mt-4">❌ {error}</div>}
      </div>
    </section>
  );
}
