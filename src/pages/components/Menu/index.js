import React, { useRef } from 'react';
import './style.scss';

const Menu = ({items}) => {
  
  return (
    <div className="menu-container">
      {items.map((item, index) => (
        <div className="menu-item" key={index} onClick={item.handler}>
          <div className="title-item">{item.title}</div>
          <div className="description-item">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
