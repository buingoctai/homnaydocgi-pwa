import React from 'react';
import './style.scss';

const Header = ({ author, time }) => {
  return (
    <div className="header">
      <div className="author">
        <div>
          <img
            src="https://www.rosephan.com/data/users/avatars/default-avatar.png"
            alt="avatar"
            width="100"
            height="100"
            style={{
              filter: 'grayscale(100%)',
              borderRadius: '50%',
              marginTop: '5PX',
            }}
          />
        </div>
        <div className="name_time">
          <span className="name">{author}</span>
          <div className="time">{time.split('T')[0]}</div>
        </div>
      </div>

      <div>more action</div>
    </div>
  );
};

export default Header;
