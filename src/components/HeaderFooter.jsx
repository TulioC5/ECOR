// src/components/HeaderFooter.jsx
import React from "react";

function HeaderFooter() {
  return (
    <>
      <header className="flex items-center space-x-2 mb-6">
        <span className="text-xl">♻️</span>
        <h1 className="text-xl font-semibold">EcoR</h1>
      </header>
      <footer className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
        <div className="flex justify-center gap-4 mb-2">
          <a href="#" className="hover:underline">Sobre nosotros</a>
          <a href="#" className="hover:underline">Contacto</a>
          <a href="#" className="hover:underline">Privacidad</a>
        </div>
        <div className="flex justify-center gap-4 text-lg">
          <a href="#">🌐</a>
          <a href="#">📘</a>
          <a href="#">📸</a>
        </div>
      </footer>
    </>
  );
}

export default HeaderFooter;
