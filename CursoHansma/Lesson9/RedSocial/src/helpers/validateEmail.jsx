/**
 * Valida si un email tiene formato correcto
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  if (typeof email !== "string") return false;
  const regex = /^[\w.-]+@[\w.-]+\.\w+$/;
  return regex.test(email.toLowerCase());
};
