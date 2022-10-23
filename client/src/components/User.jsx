import React from 'react';

const User = ({ user = {} }) => {
  return (
    <div className="userContainer">
      <div className="userWrapper">
        <img src={user.photo} alt="avatar" />
        <div className="details">
          <table>
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>Position:</th>
                <td>{user.position}</td>
              </tr>
              <tr>
                <th>User id:</th>
                <td>{user.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
