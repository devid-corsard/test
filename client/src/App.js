import React from 'react';
import AdminPanel from './components/AdminPanel';
import Positions from './components/Positions';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import Users from './components/Users';

const App = () => {
  return (
    <div className="appContainer">
      <Register />
      <Users />
      <UserDetails />
      <Positions />
      <AdminPanel />
    </div>
  );
};

export default App;
