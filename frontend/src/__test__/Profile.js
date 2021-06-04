import React from 'react';

const Profile = ({ username, name }) => (
  <div>
    <b>{username}</b>&nbsp;
    <span>({name})</span>
  </div>
);

export default Profile;
