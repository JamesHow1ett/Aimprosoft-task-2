import React from 'react';

function Welcome (props) {
  const { username, logout } = props;

  return (
    <div className='form-container__body'>
      <h1
        className='form-container__title'
      >Welcome, <span>{username}</span>
      </h1>
      <button
        className='form-container__logout'
        onClick={() => logout()}
      >Log out
      </button>
    </div>
  );
}

export default Welcome;
