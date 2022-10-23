import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [message, setMessage] = useState(null);
  const [messageD, setMessageD] = useState(null);

  const generate = async () => {
    try {
      const res = await axios.post('/generate');
      setMessage(res.data.message);
    } catch (err) {}
  };

  const clearUsers = async () => {
    try {
      const res = await axios.delete('/generate');
      setMessageD(res.data.message);
    } catch (err) {}
  };
  return (
    <div className="adminContainer">
      <div className="adminWrapper">
        <button onClick={generate}>Generate users</button>
        {message && <p>{message}</p>}
        <button onClick={clearUsers} className="red">
          Clear database of users
        </button>
        {messageD && <p>{messageD}</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
