import React from 'react';
import './style.scss';

const Menu = ({ items, ...restProps }) => {
  const { onClick = () => {} } = restProps;

  return (
    <div className="menu-container" onClick={onClick}>
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
