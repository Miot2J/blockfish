import React from 'react';

const Header = () => {
  const backgroundImage = 'https://source.unsplash.com/random';
  return (
    <div
      className="mainbackground"
      style={{
        alignItems: 'center',
        minWidth: '768px',
        height: '200px',
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <p className="title">Notepad++</p>
      <hr />
      <p className="introduction">
        Bring the best of open source to you, your team, and your company
      </p>
    </div>
  );
};

export default Header;
