// @ts-nocheck
import React from "react";
import { UserCard } from "../user/UserCard";
import "../../styles/follow.css";

export const FollowingList = ({ following = [] }) => {
  return (
    <div className="following-list">
      <h3>Siguiendo</h3>
      {following.length === 0 ? (
        <p>No estás siguiendo a nadie todavía.</p>
      ) : (
        following.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
};
