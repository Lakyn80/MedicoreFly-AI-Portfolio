import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX, FiMessageSquare } from "react-icons/fi";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      const botMsg = { role: "bot", content: data.reply || "No response" };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Error contacting AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setShowButton(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence
        onExitComplete={() => setShowButton(true)}
      >
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="w-80 h-[28rem] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 bg-emerald-600 text-white rounded-t-xl">
              <span className="font-medium">🎷 Ask Adam's AI</span>
              <button onClick={handleClose}>
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-white dark:bg-gray-900">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded-lg max-w-[85%] break-words ${
                    msg.role === "user"
                      ? "ml-auto bg-emerald-100 text-black"
                      : "mr-auto bg-gray-200 dark:bg-gray-300 text-black"
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  className="text-gray-500 italic text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="animate-pulse">AI is typing...</span>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex border-t border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800">
              <input
                type="text"
                className="flex-1 px-3 py-1 border rounded-l-md bg-white dark:bg-gray-800 text-white placeholder-gray-400 dark:placeholder-gray-300 border-gray-300 dark:border-gray-600 focus:outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-emerald-500 text-white px-3 rounded-r-md hover:bg-emerald-600 transition"
              >
                <FiSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Open Button */}
      {showButton && !open && (
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700"
        >
          <FiMessageSquare className="text-2xl" />
        </motion.button>
      )}
    </div>
  );
}
