import React from 'react';

const User = ({ user = {} }) => {
  return (
    <div className="userContainer">
      <div className="userWrapper">
        <img src={user.photo} alt="avatar" />
        <div className="details">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.position_id}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
