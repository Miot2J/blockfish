import React from 'react';

const Header = () => {
  const backgroundImage = 'https://source.unsplash.com/random';
  return (
    <div
      className="mainbackground"
      style={{
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
