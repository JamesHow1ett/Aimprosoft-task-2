import React from 'react';

function ResetPasswordForm (props) {
  const {
    isFindUserForm,
    login,
    newPassword,
    noFindUser,
    userInDb,
    findUser,
    handleLoginInput,
    handleNewPasswordInput,
    updatePasswordAndResetState
  } = props;

  return (
    (isFindUserForm && !userInDb
      ? <form
          onSubmit={(e) => findUser(e)}
          className='form'
        >
        <div
          className={
            !noFindUser
              ? 'login'
              : 'login login_fail'
          }
        >
          <input
            type='text'
            name='login'
            placeholder='Login'
            autoComplete='username'
            className='form__input form__login'
            value={login}
            onChange={(e) => handleLoginInput(e)}
          />
        </div>
        <button
          type='submit'
          className='form__submit form__submit_big'
        >Find user
        </button>
        </form>
      : <form
          onSubmit={(e) => updatePasswordAndResetState(e)}
          className='form'
        >
        <input
          type='password'
          name='new-password'
          placeholder='Enter new password'
          autoComplete='new-password'
          className='form__input form__password'
          value={newPassword}
          onChange={(e) => handleNewPasswordInput(e)}
        />
        <button
          type='submit'
          className='form__submit form__submit_big'
        >Update password
        </button>
        </form>
    )
  );
}

export default ResetPasswordForm;
