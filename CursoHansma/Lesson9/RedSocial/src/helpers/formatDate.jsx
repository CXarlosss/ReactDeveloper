// @ts-nocheck
/**
 * Formatea una fecha al estilo español
 * @param {Date|string|number} date
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = new Date(date);
  if (isNaN(d)) return "Fecha inválida";

  return d.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
