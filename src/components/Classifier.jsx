// src/components/Classifier.jsx
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

function Classifier() {
  const videoRef = useRef(null);
  const [prediction, setPrediction] = useState("Cargando modelo...");
  const [suggestion, setSuggestion] = useState("");
  const [overlayColor, setOverlayColor] = useState("transparent");
  const [overlayMessage, setOverlayMessage] = useState("");
  const modelRef = useRef(null);
  const successSoundRef = useRef(null);

  const colorMap = {
    reciclable: "#ffffff",
    organico: "#10b981",
    no_reciclable: "#000000",
  };

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment", width: { ideal: 640 }, height: { ideal: 480 } } },
        audio: false,
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    }

    async function loadModel() {
      modelRef.current = await mobilenet.load();
      setPrediction("Modelo cargado. Presiona 'Iniciar' para analizar.");
    }

    setupCamera();
    loadModel();
  }, []);

  const handlePrediction = async () => {
    if (!modelRef.current || !videoRef.current) return;

    setOverlayColor("rgba(0,0,0,0.25)");
    setOverlayMessage("Analizando...");
    setSuggestion("");

    const result = await modelRef.current.classify(videoRef.current);

    if (result && result.length > 0) {
      const confidence = result[0].probability;
      const className = result[0].className.toLowerCase();
      setPrediction(`${className} (${(confidence * 100).toFixed(1)}%)`);

      if (confidence > 0.6) {
        let suggestedClass = "no_reciclable";
        if (className.includes("banana") || className.includes("food")) {
          suggestedClass = "organico";
        } else if (className.includes("plastic") || className.includes("bottle") || className.includes("can") || className.includes("paper")) {
          suggestedClass = "reciclable";
        }

        setOverlayColor(colorMap[suggestedClass] + "66");
        setOverlayMessage(`✅ Clasificado como ${suggestedClass.replace("_", " ")}`);
        successSoundRef.current?.play();
        setSuggestion(`Color del contenedor: ${suggestedClass === "reciclable" ? "⚪ Blanco" : suggestedClass === "organico" ? "🟢 Verde" : "⚫ Negro"}`);
      } else {
        setOverlayColor("rgba(239,68,68,0.4)");
        setOverlayMessage("❌ Intenta nuevamente");
      }

      setTimeout(() => {
        setOverlayColor("transparent");
        setOverlayMessage("");
      }, 3000);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-full max-w-md">
        <video ref={videoRef} autoPlay playsInline className="rounded-xl shadow-lg w-full" />
        <div
          className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none transition-all duration-300 flex items-center justify-center"
          style={{ backgroundColor: overlayColor }}
        >
          {overlayMessage && (
            <span className="text-white text-xl font-bold drop-shadow-lg text-center px-4">
              {overlayMessage}
            </span>
          )}
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold">Predicción: {prediction}</p>
      {suggestion && <p className="mt-2 text-md text-green-700 font-medium">{suggestion}</p>}
      <button
        onClick={handlePrediction}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Iniciar
      </button>
      <audio ref={successSoundRef} src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_c7713f674b.mp3?filename=success-1-6297.mp3" preload="auto" />
    </div>
  );
}

export default Classifier;
