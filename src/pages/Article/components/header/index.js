import React from 'react';

const Header = ({ post }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <img
            src="https://www.rosephan.com/data/users/avatars/default-avatar.png"
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: '5px',
          }}
        >
          <span style={{ fontWeight: '700', fontSize: '25px' }}>{post.Author}</span>
          <div style={{ fontSize: '20px' }}>{post.SubmitDate.split('T')[0]}</div>
        </div>
      </div>

      <div>more action</div>
    </div>
  );
};

export default Header;
