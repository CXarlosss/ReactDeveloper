// @ts-nocheck
// src/hooks/usePost.js
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

/**
 * Hook para obtener posts en tiempo real
 * @param {string|null} userId
 */
export const usePost = (userId = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, "posts");

    q = userId
      ? query(q, where("userId", "==", userId), orderBy("createdAt", "desc"))
      : query(q, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error al cargar publicaciones:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { posts, loading };
};
