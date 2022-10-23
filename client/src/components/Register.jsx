import React, { useRef, useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(null);
  const [verified, setVerified] = useState(null);
  const tokenInput = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const positionId = e.target[3].value;
    const photo = e.target[4].files[0];

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', positionId);
    formData.append('photo', photo);

    try {
      const res = await axios.post('/users', formData);
      setCurrentUser({ id: res.data.user_id, name });

      const token = await axios.get('/token', { user_id: res.data.user_id });
      setToken(token.data.token);
    } catch (err) {}
  };

  const handleVerifyToken = async () => {
    try {
      const res = await axios.get('/token/verify', {
        headers: { token: tokenInput.current.value || 'not a token' },
      });
      if (res.data.success) setVerified('Verified!');
      setTimeout(() => {
        setVerified(null);
      }, 5000);
    } catch (err) {
      setVerified(err.response.data.message);
      setTimeout(() => {
        setVerified(null);
      }, 5000);
    }
  };

  return (
    <div className="formContainer">
      <div className="userLogin">
        <h2>Username: {currentUser.name}</h2>
        <p>your user_id:</p>
        <input defaultValue={currentUser.id} />
        <p>your token: </p>
        <input defaultValue={token} ref={tokenInput} />
        <button onClick={handleVerifyToken}>Verify token</button>
        {verified && <span>{verified}</span>}
      </div>
      <div className="formWrapper">
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="tel" placeholder="phone" defaultValue="+380" />
          <small>Format: +380123456789</small>
          <input type="number" placeholder="positionId" />
          <p>Photo:</p>
          <input type="file" name="photo" />
          <button>Register</button>
          {token && <span>Succsess!</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;
