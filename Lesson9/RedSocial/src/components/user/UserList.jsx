// @ts-nocheck
import React from "react";
import { UserCard } from "./UserCard";
import "../styles/userList.css";

export const UserList = ({
  users = [],
  currentUserId,
  onFollow,
  onUnfollow,
  following = [],
}) => {
  return (
    <div className="user-list">
      {users
        .filter((user) => user.id !== currentUserId)
        .map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            isFollowing={following.includes(user.id)}
          />
        ))}
    </div>
  );
};
