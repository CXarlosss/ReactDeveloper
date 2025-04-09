import React from 'react';
import "../../styles/follow.css"
export const FollowButton = ({ isFollowing, onToggle }) => {
  return (
    <button className={`follow-btn ${isFollowing ? 'following' : ''}`} onClick={onToggle}>
      {isFollowing ? 'Siguiendo' : 'Seguir'}
    </button>
  );
};
