import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Positions = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await axios.get('/positions');
      setPositions(res.data.positions);
    };
    fetchPositions();
  }, []);

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
