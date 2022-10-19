import React from 'react';
import Positions from './components/Positions';
import Register from './components/Register';
import UserDetails from './components/UserDetails';
import Users from './components/Users';

const App = () => {
  return (
    <div>
      <Register />
      <Users />
      <UserDetails />
      <Positions />
    </div>
  );
};

export default App;
