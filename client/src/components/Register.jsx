import React from 'react';
import axios from 'axios';

const Register = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const positionId = e.target[3].value;
    const photo = e.target[4].files[0];
    console.log(name, email, phone, positionId);

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', positionId);
    formData.append('photo', photo);

    axios
      .post('/users', formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input
            type="tel"
            placeholder="phone"
            pattern="^\+380[0-9]{9}"
            defaultValue="+380"
          />
          <small>Format: +380123456789</small>
          <input type="number" placeholder="positionId" />
          <p>Photo:</p>
          <input type="file" name="photo" />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
