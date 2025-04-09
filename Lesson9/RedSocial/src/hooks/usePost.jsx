// @ts-nocheck
// src/hooks/usePost.js
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const usePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { posts, loading };
};
