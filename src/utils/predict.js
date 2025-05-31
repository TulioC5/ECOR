// src/utils/predict.js
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";

const CACHE_KEY = "mobilenet_v2_model";

export async function loadOrCacheModel() {
  const indexeddbModels = await tf.io.listModels();
  if (indexeddbModels[CACHE_KEY]) {
    return await tf.loadLayersModel(`indexeddb://${CACHE_KEY}`);
  }
  const model = await mobilenet.load();
  await model.model.save(`indexeddb://${CACHE_KEY}`); // Save internal tf.Model
  return model;
}

export async function predictWithModel(model, videoElement) {
  try {
    const predictions = await model.classify(videoElement);
    if (!predictions || predictions.length === 0) return null;

    const { className, probability } = predictions[0];
    const label = `${className} (${(probability * 100).toFixed(1)}%)`;

    // Simplificada clasificación visual
    let detectedClass = "no reciclable";
    let color = "#000000";
    let icon = "⚫ Negro";

    if (className.toLowerCase().includes("bottle") || className.includes("plastic") || className.includes("can") || className.includes("paper")) {
      detectedClass = "reciclable";
      color = "#ffffff";
      icon = "⚪ Blanco";
    } else if (className.toLowerCase().includes("banana") || className.includes("food")) {
      detectedClass = "orgánico";
      color = "#10b981";
      icon = "🟢 Verde";
    }

    return {
      label,
      confidence: probability,
      class: detectedClass,
      color,
      icon
    };
  } catch (error) {
    console.error("Error al predecir:", error);
    return null;
  }
}
