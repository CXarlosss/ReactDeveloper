// @ts-nocheck
// src/hooks/usePost.js
import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export const usePost = (userId = null) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let q = collection(db, "posts");
    q = userId 
      // eslint-disable-next-line no-undef
      ? query(q, where("userId", "==", userId), orderBy("createdAt", "desc"))
      : query(q, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { posts, loading };
};
