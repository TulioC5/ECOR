import React from "react";
import { useNavigate } from "react-router-dom";

function Aprender() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">💡 Aprende a Reciclar</h1>
      <p className="text-gray-700 mb-4">
        Clasificar correctamente los residuos ayuda a reducir la contaminación, reutilizar materiales y proteger nuestro entorno. Saber qué residuos van en qué contenedor es clave para un reciclaje exitoso.
      </p>
      <p className="text-gray-700 mb-4">
        En Guatemala, se promueve la separación en tres categorías principales:
      </p>
      <ul className="list-disc list-inside text-gray-800 mb-6">
        <li><strong>Orgánico (Verde):</strong> restos de comida, cáscaras, vegetales.</li>
        <li><strong>Reciclable (Blanco):</strong> papel, cartón, vidrio, plástico limpio.</li>
        <li><strong>No reciclable (Negro):</strong> residuos sanitarios, mezclas sucias, cepillos usados.</li>
      </ul>

      <div className="my-6">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Bkkp2BCapI8?si=-JZ9H5lCCAWMgQZ9"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="mx-auto rounded-lg shadow-md"
        ></iframe>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Aprender;
