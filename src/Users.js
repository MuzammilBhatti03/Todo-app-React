import React, { useState } from 'react';
import axios from 'axios';

const Users = ({ log, setlog }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      name: 'Ali',
      email: 'Ali@gmail.com',
      image: 'https://media.istockphoto.com/id/1575126031/photo/mid-aged-business-man-working-on-laptop-computer-in-office-writing-notes.webp?b=1&s=170667a&w=0&k=20&c=u1kJ03JQrC5KgELDWtYqvKQmKbjCtmq9GcaVCLxO97Y='
    },
    {
      name: 'Ahmed',
      email: 'Ahmed@gmail.com',
      image: 'https://media.istockphoto.com/id/1476170969/photo/portrait-of-young-man-ready-for-job-business-concept.webp?b=1&s=170667a&w=0&k=20&c=FycdXoKn5StpYCKJ7PdkyJo9G5wfNgmSLBWk3dI35Zw='
    },
  ];

  const handleUserClick = async (user) => {
    try {
      const response = await axios.post('http://localhost:3001/this',  { email: user.email, password: 'pass' } );
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
    setSelectedUser(user);
  };
  return (
    <div className='userdiv'>
      <div className='userlist'>
        Users:
        <br />
        <ul>
          {users.map(user => (
            <li key={user.email}>
              <a href="#" onClick={(event) => { event.preventDefault(); handleUserClick(user); }}>
                {user.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className='info'>
        {selectedUser && (
          <>
            <label>{selectedUser.name}</label>
            <br />
            <label>{selectedUser.email}</label>
            <br />
            <img src={selectedUser.image} className='imag' alt={selectedUser.name} />
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
