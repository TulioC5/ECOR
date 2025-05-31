// src/pages/Reciclar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Classifier from "../components/Classifier";

function Reciclar() {
  const navigate = useNavigate();
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Módulo de Clasificación</h2>
      <Classifier />
      <div className="mt-6">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => navigate("/")}
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}

export default Reciclar;
