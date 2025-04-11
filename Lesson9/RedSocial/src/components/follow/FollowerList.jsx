// @ts-nocheck
import React from 'react';
import { UserCard } from '../user/UserCard';
import "../../styles/follow.css"


export const FollowersList = ({ followers }) => {
  return (
    <div className="followers-list">
      <h3>Seguidores</h3>
      {followers.length === 0
        ? <p>No tienes seguidores todavía.</p>
        : followers.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
