// @ts-nocheck
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

// Obtener usuario por username
export const getUserByUsername = async (username) => {
  try {
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    return null;
  }
};

// Obtener publicaciones por ID de usuario
export const getPostsByUserId = async (userId) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener posts:", error);
    return [];
  }
};
