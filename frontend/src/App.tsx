import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='main-grid'>
      <div className='profile'>
        <div className='profile--header'>
            <img className='profile--header--icon' src="/user-icon.png" alt="User icon" />
            
            <button className='button'>Log In</button>
          </div>

        <div className='profile--search'>
          <input className='profile--search--input' type="text" placeholder='Search or start new chat' />
        </div>
      </div>

      <div className='chats'>
        <h2 className='chats--h'>Chats</h2>
      </div>

      <div className='chat-header'>

      </div>

      <div className='chat-messages'>

      </div>
    </div>
  );
}

export default App;
