import React from 'react';

const Positions = () => {
  const positions = [
    {
      id: 1,
      name: 'Security',
    },
    {
      id: 2,
      name: 'Designer',
    },
    {
      id: 3,
      name: 'Content manager',
    },
    {
      id: 4,
      name: 'Lawyer',
    },
  ];
  return (
    <div className="positionsContainer">
      <div className="positionsWrapper">
        <span className="title">Positions List</span>
        <table>
          <tr>
            <th>ID</th>
            <th>Position</th>
          </tr>
          {positions.map((position) => (
            <tr>
              <td>{position.id}</td>
              <td>{position.name}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Positions;
