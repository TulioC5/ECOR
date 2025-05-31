// import React, { useEffect, useRef, useState } from "react";
// import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// function Landing() {
//   const navigate = useNavigate();
//   return (
//     <div className="min-h-screen flex flex-col justify-between p-4">
//       <header className="flex items-center space-x-2 mb-6">
//         <span className="text-xl">♻️</span>
//         <h1 className="text-xl font-semibold">EcoR</h1>
//       </header>

//       <main className="space-y-8">
//         <section>
//           <h2 className="text-2xl font-bold">Bienvenido a EcoR</h2>
//           <p className="text-gray-600 mt-2">
//             Únete a nosotros para marcar la diferencia reciclando, conservando los recursos de nuestro planeta y así lograr un mejor país.
//           </p>
//         </section>

//         <section>
//           <h3 className="text-xl font-semibold">¿Por qué reciclar?</h3>
//           <p className="text-gray-600 mt-1">
//             El reciclaje ayuda a reducir los residuos, conservar los recursos naturales y proteger el medio ambiente.
//           </p>
//           <img
//             src="https://img.freepik.com/vector-gratis/concepto-rsc-diseno-plano-organico-ilustrado_23-2148916673.jpg"
//             alt="Recycling bin"
//             className="w-48 mx-auto mt-4"
//           />
//         </section>

//         <section>
//           <h3 className="text-xl font-semibold">¡Empieza a clasificar!</h3>
//           <p className="text-gray-600 mt-1">
//             Si tienes dudas sobre tu residuo, puedes presionar el botón y nuestra IA te ayudará a identificar en qué recipiente debes clasificarlo.
//           </p>
//           <img
//             src="https://img.freepik.com/vector-gratis/gente-sonriente-reciclando-juntos_23-2148518962.jpg"
//             alt="Sorting waste"
//             className="w-48 mx-auto mt-4"
//           />
//         </section>

//         <div className="text-center">
//           <button
//             className="bg-black text-white px-6 py-2 rounded-xl hover:bg-gray-800"
//             onClick={() => navigate("/reciclar")}
//           >
//             Reciclar
//           </button>
//         </div>
//       </main>

//       <footer className="text-center text-sm text-gray-500 mt-10 border-t pt-4">
//         <div className="flex justify-center gap-4 mb-2">
//           <a href="#" className="hover:underline">Sobre nosotros</a>
//           <a href="#" className="hover:underline">Contacto</a>
//           <a href="#" className="hover:underline">Privacidad</a>
//         </div>
//         <div className="flex justify-center gap-4 text-lg">
//           <a href="#">🌐</a>
//           <a href="#">📘</a>
//           <a href="#">📸</a>
//         </div>
//       </footer>
//     </div>
//   );
// }

// function Classifier() {
//   const videoRef = useRef(null);
//   const [prediction, setPrediction] = useState("Cargando modelo...");
//   const [suggestion, setSuggestion] = useState("");
//   const [overlayColor, setOverlayColor] = useState("transparent");
//   const [overlayMessage, setOverlayMessage] = useState("");
//   const modelRef = useRef(null);
//   const successSoundRef = useRef(null);

//   const colorMap = {
//     reciclable: "#ffffff",
//     organico: "#10b981",
//     no_reciclable: "#000000",
//   };

//   useEffect(() => {
//     async function setupCamera() {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: { ideal: "environment", width: { ideal: 640 }, height: { ideal: 480 } } },
//         audio: false,
//       });
//       if (videoRef.current) videoRef.current.srcObject = stream;
//     }

//     async function loadModel() {
//       modelRef.current = await mobilenet.load();
//       setPrediction("Modelo cargado. Presiona 'Iniciar' para analizar.");
//     }

//     setupCamera();
//     loadModel();
//   }, []);

//   const handlePrediction = async () => {
//     if (!modelRef.current || !videoRef.current) return;

//     setOverlayColor("rgba(0,0,0,0.25)");
//     setOverlayMessage("Analizando...");
//     setSuggestion("");

//     const result = await modelRef.current.classify(videoRef.current);

//     if (result && result.length > 0) {
//       const confidence = result[0].probability;
//       const className = result[0].className.toLowerCase();
//       setPrediction(`${className} (${(confidence * 100).toFixed(1)}%)`);

//       if (confidence > 0.6) {
//         let suggestedClass = "no_reciclable";
//         if (className.includes("banana") || className.includes("food")) {
//           suggestedClass = "organico";
//         } else if (className.includes("plastic") || className.includes("bottle") || className.includes("can") || className.includes("paper")) {
//           suggestedClass = "reciclable";
//         }

//         setOverlayColor(colorMap[suggestedClass] + "66"); // 66 = 40% opacity
//         setOverlayMessage(`✅ Clasificado como ${suggestedClass.replace("_", " ")}`);
//         successSoundRef.current?.play();
//         setSuggestion(`Color del contenedor: ${suggestedClass === "reciclable" ? "⚪ Blanco" : suggestedClass === "organico" ? "🟢 Verde" : "⚫ Negro"}`);
//       } else {
//         setOverlayColor("rgba(239,68,68,0.4)");
//         setOverlayMessage("❌ Intenta nuevamente");
//       }

//       setTimeout(() => {
//         setOverlayColor("transparent");
//         setOverlayMessage("");
//       }, 3000);
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center">
//       <div className="relative w-full max-w-md">
//         <video ref={videoRef} autoPlay playsInline className="rounded-xl shadow-lg w-full" />
//         <div
//           className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none transition-all duration-300 flex items-center justify-center"
//           style={{ backgroundColor: overlayColor }}
//         >
//           {overlayMessage && (
//             <span className="text-white text-xl font-bold drop-shadow-lg text-center px-4">
//               {overlayMessage}
//             </span>
//           )}
//         </div>
//       </div>
//       <p className="mt-4 text-lg font-semibold">Predicción: {prediction}</p>
//       {suggestion && <p className="mt-2 text-md text-green-700 font-medium">{suggestion}</p>}
//       <button
//         onClick={handlePrediction}
//         className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Iniciar
//       </button>
//       <audio ref={successSoundRef} src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_c7713f674b.mp3?filename=success-1-6297.mp3" preload="auto" />
//     </div>
//   );
// }

// function Reciclar() {
//   const navigate = useNavigate();
//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl font-bold mb-4">Módulo de Clasificación</h2>
//       <Classifier />
//       <div className="mt-6">
//         <button
//           className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
//           onClick={() => navigate("/")}
//         >
//           Volver a Inicio
//         </button>
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/reciclar" element={<Reciclar />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Home";
import Reciclar from "./pages/Reciclar";
import Aprender from "./pages/Aprender";
import Juego from "./pages/Juego";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reciclar" element={<Reciclar />} />
      <Route path="/aprender" element={<Aprender />} />
      <Route path="/juego" element={<Juego />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

