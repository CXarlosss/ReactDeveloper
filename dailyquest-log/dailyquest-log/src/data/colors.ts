// src/data/colors.ts

/**
 * 🎨 PALETA PRINCIPAL
 * Incluye los colores más usados y los más útiles para bloques.
 */
export const COLORS = [
  // Neutrales esenciales
  "#000000",
  "#ffffff",
  "#1f2937", // neutral-800
  "#374151", // neutral-700
  "#6b7280", // neutral-500
  "#d1d5db", // neutral-300

  // Vibrantes de Tailwind
  "#ef4444", // rojo
  "#f97316", // naranja
  "#fbbf24", // amarillo
  "#22c55e", // verde
  "#3b82f6", // azul
  "#6366f1", // indigo
  "#a855f7", // púrpura
  "#ec4899", // rosa

  // Pastel aesthetic (muy útiles para notas y bloques suaves)
  "#fde68a", // soft yellow
  "#fecaca", // soft red
  "#bfdbfe", // soft blue
  "#c7d2fe", // soft indigo
  "#f5d0fe", // soft pink/purple
  "#bbf7d0", // soft green

  // Elegant muted
  "#94a3b8", // slate-400
  "#64748b", // slate-500
  "#475569", // slate-600
];

/**
 * 🌈 GRADIENTES PREMIUM (Canva/Figma style)
 */
export const GRADIENTS = [
  // Fuerte + suave
  "linear-gradient(135deg, #ef4444, #fca5a5)",
  "linear-gradient(135deg, #3b82f6, #a5b4fc)",
  "linear-gradient(135deg, #22c55e, #bbf7d0)",
  "linear-gradient(135deg, #f97316, #fdba74)",
  "linear-gradient(135deg, #ec4899, #f9a8d4)",
  "linear-gradient(135deg, #6366f1, #c7d2fe)",

  // Gradientes estilo Linear.app
  "linear-gradient(135deg, #4f46e5, #9333ea)",
  "linear-gradient(135deg, #0ea5e9, #22d3ee)",
  "linear-gradient(135deg, #10b981, #84cc16)",

  // Gradientes minimalistas beige/arena
  "linear-gradient(135deg, #f5e6ca, #e9d5a1)",
  "linear-gradient(135deg, #fef3c7, #fde68a)",

  // Gradientes fríos y elegantes
  "linear-gradient(135deg, #1e293b, #64748b)",
  "linear-gradient(135deg, #0f172a, #334155)",

  // Gradientes blanco → color
  "linear-gradient(135deg, #ffffff, #fde68a)",
  "linear-gradient(135deg, #ffffff, #c7d2fe)",
  "linear-gradient(135deg, #ffffff, #fecaca)",

  // Cyberpunk aesthetic
  "linear-gradient(135deg, #ec4899, #a855f7)",
  "linear-gradient(135deg, #3b82f6, #06b6d4)",
];

/**
 * Futuro escalable: permitir otros formatos
 * - { solid: "#fff" }
 * - { gradient: "linear-gradient(...)" }
 * - { tailwind: "bg-blue-500" }
 * - { rgba: "rgba(255, 0, 0, .5)" }
 */
export type ColorValue = string;
