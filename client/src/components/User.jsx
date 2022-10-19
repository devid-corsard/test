import React from 'react';

const User = () => {
  return (
    <div className="userContainer">
      <div className="userWrapper">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
        <div className="details">
          <p>Name</p>
          <p>Email</p>
          <p>phone</p>
          <p>position id</p>
        </div>
      </div>
    </div>
  );
};

export default User;
