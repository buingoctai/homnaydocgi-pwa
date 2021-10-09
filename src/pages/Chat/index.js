import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { ChatEngine } from 'react-chat-engine';

import LoginForm from './components/LoginForm';
import './style.scss';

const projectID = '90e49484-9326-4c12-8d15-7ad6a225fc57';

const Chat = () => {
  // const [userStatus,setUserStatus ]= useState([]);
  if (!localStorage.getItem('username')) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatSettings={(chatAppState) => {
        console.log(chatAppState);
        const id = chatAppState.activeChat;
        if (chatAppState.chats) {
          const chats = chatAppState['chats'][id];
          const peoples = chats['people'];
          const userStatus = peoples.map((p) => p.person);

          return ReactDOM.createPortal(
            <div className="pop-setting">
              <div className="chat-setting-container">
                <span className="title-status-pop">User Status</span>
                {userStatus.map((item) => (
                  <div className="user">
                    <div className="avatar">
                      <img src={item.avatar} loading="lazy" />
                    </div>
                    {item.is_online && <span className="status"></span>}
                    <span className="name">{`${item.first_name} ${item.last_name}`}</span>
                  </div>
                ))}
              </div>
            </div>,
            document.body
          );
        }
      }}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    />
  );
};

export default Chat;
