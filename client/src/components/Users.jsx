import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import User from './User';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(5);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setOffset((page - 1) * count);
    try {
      const fetchUsers = async () => {
        const res = await axios.get(`/users?page=${page}&count=${count}`);
        setUsers(res.data.users);
      };
      fetchUsers();
    } catch (err) {
      setErr(true);
    }
  }, [page, count]);

  return (
    <div className="usersContainer">
      <div className="usersWrapper">
        <span className="title">Users</span>
        {err && <span>Something went wrong...</span>}
        {users.length ? (
          users.map((user) => <User key={user.id} user={user} />)
        ) : (
          <button>Get users</button>
        )}
      </div>
      <div className="buttonsWrapper">
        <button onClick={() => page > 1 && setPage(page - 1)}>
          {'<< prev'}
        </button>
        <span>Page: {page} </span>
        <button onClick={() => setPage(page + 1)}>{'next >>'}</button>
      </div>
      <div className="countWrapper">
        <span>Count: </span>
        <input
          type="number"
          value={count}
          onInput={(e) => setCount(e.target.value)}
        />
        <span>Offset: {offset} </span>
      </div>
    </div>
  );
};

export default Users;
