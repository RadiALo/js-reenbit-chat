import React from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';

const App: React.FC = () => {
  return (
    <div className='main-grid'>
      <div className='profile'>
        <div className='profile--header'>
            <img className='user-icon' src="/user-icon.png" alt="User icon" />
            <div className='profile--name'>Danylo Kozakov</div>

            <button className='button'>Log In</button>
          </div>

        <div className='profile--search'>
          <input className='profile--search--input' type="text" placeholder='Search or start new chat' />
        </div>
      </div>

      <div className='chats'>
        <h2 className='chats--h'>Chats</h2>

        <div className='chats--list'>
          <div className='chats--item'>
            <img className='user-icon' src="/user-icon.png" alt="User icon" />
            <div className='chats--item--text'>
              <p className='chats--item--text--name'>Alice Freeman</p>
              <p className='chats--item--text--message'>How was your meeting?</p>
            </div>
            <div className='chats--item--date'>
              Aug 17, 2022
            </div>
          </div>

          <div className='chats--item'>
            <img className='user-icon' src="/user-icon.png" alt="User icon" />
            <div className='chats--item--text'>
              <p className='chats--item--text--name'>Josefina</p>
              <p className='chats--item--text--message'>Hi! No, I am going for a walk.</p>
            </div>
            <div className='chats--item--date'>
              Aug 16, 2022
            </div>
          </div>

          <div className='chats--item'>
            <img className='user-icon' src="/user-icon.png" alt="User icon" />
            <div className='chats--item--text'>
              <p className='chats--item--text--name'>Velazquez</p>
              <p className='chats--item--text--message'>Hi! I am a little sad, tell me a joke please.</p>
            </div>
            <div className='chats--item--date'>
              Aug 17, 2022
            </div>
          </div>

          <div className='chats--item'>
            <img className='user-icon' src="/user-icon.png" alt="User icon" />
            <div className='chats--item--text'>
              <p className='chats--item--text--name'>Piter</p>
              <p className='chats--item--text--message'></p>
            </div>
            <div className='chats--item--date'>
              Aug 17, 2022
            </div>
          </div>
        </div>
      </div>

      <div className='chat-header'>
        <img className='user-icon' src="/user-icon.png" alt="User icon" />

        <div className='chat-header--name'>Alice Freeman</div>
      </div>

      <div className='chat-messages'>
        <div className='chat-messages--list'>
          <ChatMessage text='How was your meeting?' date='8/17/2022, 7:43 AM' isUserMessage={false}/>
          <ChatMessage text='Not bad. What about you?' date='8/17/2022, 7:45 AM'/>
          <ChatMessage text='How was your meeting?' date='8/17/2022, 7:46 AM'/>
        </div>

        <div className='chat-messages--bar'>
          <textarea className='chat-messages--bar--input' rows={1} placeholder='Type your message' />
        </div>
      </div>
    </div>
  );
}

export default App;
