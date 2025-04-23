// @ts-nocheck
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

/**
 * Obtiene un usuario por su username
 * @param {string} username
 * @returns {Promise<object|null>}
 */
export const getUserByUsername = async (username) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }

    return null;
  } catch (error) {
    console.error("Error al obtener usuario por username:", error);
    return null;
  }
};

/**
 * Obtiene todas las publicaciones de un usuario por su ID
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export const getPostsByUserId = async (userId) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener posts del usuario:", error);
    return [];
  }
};
