// src/pages/Juego.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const preguntas = [
  {
    texto: "¿Dónde debes desechar una botella plástica limpia?",
    opciones: ["Orgánico", "Reciclable", "No reciclable"],
    respuesta: "Reciclable",
  },
  {
    texto: "¿Dónde clasificarías una cáscara de banano?",
    opciones: ["Reciclable", "Orgánico", "No reciclable"],
    respuesta: "Orgánico",
  },
  {
    texto: "¿Dónde va un vaso roto de vidrio?",
    opciones: ["Orgánico", "Reciclable", "No reciclable"],
    respuesta: "No reciclable",
  },
  {
    texto: "¿Dónde tirarías un papel usado y seco?",
    opciones: ["Reciclable", "No reciclable", "Orgánico"],
    respuesta: "Reciclable",
  },
  {
    texto: "¿Dónde va un pañal usado?",
    opciones: ["Orgánico", "Reciclable", "No reciclable"],
    respuesta: "No reciclable",
  },
  {
    texto: "¿Dónde tirarías restos de comida cocinada?",
    opciones: ["No reciclable", "Reciclable", "Orgánico"],
    respuesta: "Orgánico",
  },
  {
    texto: "¿Dónde clasificarías un periódico viejo?",
    opciones: ["Orgánico", "Reciclable", "No reciclable"],
    respuesta: "Reciclable",
  },
  {
    texto: "¿Dónde va un cepillo de dientes usado?",
    opciones: ["Orgánico", "Reciclable", "No reciclable"],
    respuesta: "No reciclable",
  },
  {
    texto: "¿Dónde tirarías una servilleta de papel sucia?",
    opciones: ["Reciclable", "Orgánico", "No reciclable"],
    respuesta: "No reciclable",
  },
  {
    texto: "¿Dónde debe ir una lata de aluminio vacía?",
    opciones: ["Reciclable", "Orgánico", "No reciclable"],
    respuesta: "Reciclable",
  }
];

function Juego() {
  const [index, setIndex] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const validar = (opcion) => {
    if (opcion === preguntas[index].respuesta) {
      setAciertos(aciertos + 1);
      setMensaje("✅ ¡Correcto!");
    } else {
      setMensaje("❌ Incorrecto. Intenta otra.");
    }
    setTimeout(() => {
      setMensaje("");
      setIndex((prev) => (prev + 1) % preguntas.length);
    }, 1500);
  };

  return (
    <div className="min-h-screen p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">🎮 Mini juego: Clasifica Rápido</h2>
      <p className="text-lg mb-6">{preguntas[index].texto}</p>
      <div className="flex justify-center gap-4 mb-4">
        {preguntas[index].opciones.map((opcion) => (
          <button
            key={opcion}
            onClick={() => validar(opcion)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            {opcion}
          </button>
        ))}
      </div>
      {mensaje && <p className="font-medium text-lg mb-4">{mensaje}</p>}
      <p className="text-gray-600 mb-6">Aciertos: {aciertos}</p>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Volver al Inicio
      </button>
    </div>
  );
}

export default Juego;
