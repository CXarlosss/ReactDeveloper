import React from 'react'

const Sidebar = ({ user }) => (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <img src={user.avatar} alt="avatar" />
        <h3>{user.name}</h3>
      </div>
      <form className="sidebar__form">
        <textarea placeholder="¿Qué estás pensando?" />
        <button disabled>Publicar</button>
      </form>
    </aside>
  );
  


export default Sidebar
