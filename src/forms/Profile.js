// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log (`${token}`)
    if (token) {
      axios.get('http://localhost:3020/users/profile',  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
      });
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="Profile">
      <h2>User Profile</h2>
      <p>Username: {user.firstname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
