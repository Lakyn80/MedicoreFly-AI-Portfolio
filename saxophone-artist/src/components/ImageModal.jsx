import React from "react";

export default function ImageModal({ isOpen, imageSrc, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={imageSrc}
        alt="Zvětšený obrázek"
        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-xl border-4 border-white"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
