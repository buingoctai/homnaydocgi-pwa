import React from 'react';
import './style.scss';

const Header = ({ author, time }) => {
  return (
    <div className="header">
      <div className="author">
        <div>
          <img
            src="https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg"
            alt="avatar"
            width="50"
            height="50"
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

      {/* <div>more action</div> */}
    </div>
  );
};

export default Header;
