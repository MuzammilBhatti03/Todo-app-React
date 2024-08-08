import React, { useState } from 'react';
import axios from 'axios';

export const SignUp = ({ userInfo, setUserInfo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpass, setConPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ((email.endsWith('@gmail.com') || email.trim().endsWith('@email.com')) && password === conpass) {
      try {
        const response = await axios.post('http://localhost:3002/signup', { email, password, name });
        console.log(response.data.message);
        setUserInfo([...userInfo, { email, password, name }]);
        setEmail('');
        setPassword('');
        setName('');
        setConPass('');
        alert('Sign up successful');
      } catch (error) {
        alert('Error signing up: ' + (error.response?.data?.message || 'An error occurred'));
        console.error('Error signing up:', error.response?.data?.message || error.message);
      }
    } else {
      alert('Enter a valid email and ensure passwords match');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Confirm Password:
          <input
            type="password"
            name="confirmpassword"
            value={conpass}
            onChange={(e) => setConPass(e.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
