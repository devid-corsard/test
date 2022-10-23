import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import User from './User';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await axios.get(`/users?page=1&count=6`);
        setResponse(res.data);
        setUsers(res.data.users);
      };
      fetchUsers();
    } catch (err) {
      setErr(true);
    }
  }, []);

  const handleShowMore = async (e) => {
    e.preventDefault();
    if (!response?.links.next_url) return;
    try {
      const fetchUsers = async () => {
        const res = await axios.get(response.links.next_url.slice(28));
        setUsers([...users, ...res.data.users]);
        setResponse(res.data);
      };
      fetchUsers();
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="usersContainer">
      <div className="usersWrapper">
        <span className="title">Users</span>
        {err && <span>Something went wrong...</span>}
        {users?.length ? (
          users.map((user) => <User key={user.id} user={user} />)
        ) : (
          <button>Get users</button>
        )}
        <div className="buttonsWrapper">
          <span>Page: {response?.page} </span>
          <span>Total pages: {response?.total_pages} </span>
          <span>Total users: {response?.total_users} </span>
          <button onClick={handleShowMore}>{'Show more...'}</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
