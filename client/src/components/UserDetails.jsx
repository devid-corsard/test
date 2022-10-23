import React from 'react';
import { useState } from 'react';
import User from './User';
import axios from 'axios';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [userId, setUserId] = useState('');

  const fetchUser = async () => {
    if (userId) {
      try {
        const res = await axios.get(`/users/${userId}`);
        setUser(res.data.user);
      } catch (err) {
        setErr(true);
      }
    }
  };

  return (
    <div className="userDetailsContainer">
      <div className="userDetailsWrapper">
        <span className="title">User details:</span>
        {user ? <User user={user} /> : <p>User not found</p>}
        <div className="buttonsWrapper">
          <input
            placeholder="User id"
            onInput={(e) => setUserId(e.target.value)}
          />
          <button onClick={fetchUser}>Get user</button>
          {err && <p>Wrong user id</p>}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
