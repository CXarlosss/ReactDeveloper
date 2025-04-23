// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Post } from "./Post";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebase/config";
import "../styles/publication/postList.css";

export const PostList = ({ userId, onDelete }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let q = collection(db, "posts");

    if (userId) {
      q = query(q, where("userId", "==", userId), orderBy("createdAt", "desc"));
    } else {
      q = query(q, orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
      },
      (err) => {
        console.error("Error cargando posts:", err);
        setError("No se pudieron cargar las publicaciones.");
      }
    );

    return () => unsubscribe();
  }, [userId]);

  if (error) {
    return <p className="post-list__error">{error}</p>;
  }

  if (posts.length === 0) {
    return <p className="post-list__empty">No hay publicaciones todavía.</p>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};
