// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserByUsername, getPostsByUserId } from "../helpers/api";
import { UserAvatar } from "../components/user/UserAvatar";
import { PostList } from "../components/publication/PostList";
import "../styles/pages/user.css";

export const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const user = await getUserByUsername(username);
      setUserData(user);
      if (user?.id) {
        const posts = await getPostsByUserId(user.id);
        setUserPosts(posts);
      }
    }
    fetchData();
  }, [username]);

  if (!userData) return <p>Cargando perfil...</p>;

  return (
    <div className="user-profile">
      <div className="user-header">
        <UserAvatar user={userData} large />
        <div className="user-info">
          <h2>{userData.name}</h2>
          <p>@{userData.username}</p>
          <span>{userData.bio || "Este usuario aún no ha escrito una bio."}</span>
        </div>
      </div>

      <div className="user-posts">
        <h3>Publicaciones</h3>
        <PostList posts={userPosts} />
      </div>
    </div>
  );
};
