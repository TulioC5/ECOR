// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <header className="flex items-center space-x-2 mb-6">
        <span className="text-xl">♻️</span>
        <h1 className="text-xl font-semibold">EcoR</h1>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Bienvenido a EcoR</h2>
          <p className="text-gray-600 mt-2">
            Únete a nosotros para marcar la diferencia reciclando, conservando los recursos de nuestro planeta y así lograr un mejor país.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold">¿Por qué reciclar?</h3>
          <p className="text-gray-600 mt-1">
            El reciclaje ayuda a reducir los residuos, conservar los recursos naturales y proteger el medio ambiente.
          </p>
          <img
            src="https://img.freepik.com/vector-gratis/concepto-rsc-diseno-plano-organico-ilustrado_23-2148916673.jpg"
            alt="Recycling bin"
            className="w-48 mx-auto mt-4"
          />
        </section>

        <section>
          <h3 className="text-xl font-semibold">¡Empieza a clasificar!</h3>
          <p className="text-gray-600 mt-1">
            Si tienes dudas sobre tu residuo, puedes presionar el botón y nuestra IA te ayudará a identificar en qué recipiente debes clasificarlo.
          </p>
          <img
            src="https://img.freepik.com/vector-gratis/gente-sonriente-reciclando-juntos_23-2148518962.jpg"
            alt="Sorting waste"
            className="w-48 mx-auto mt-4"
          />
        </section>

        <div className="text-center space-y-2">
          <button
            className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
            onClick={() => navigate("/reciclar")}
          >
            Reciclar
          </button>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
            onClick={() => navigate("/aprender")}
          >
            Aprendé a reciclar
          </button>
          <button
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700"
            onClick={() => navigate("/juego")}
          >
            Jugar
          </button>
        </div>
      </main>

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
    </div>
  );
}

export default Landing;
