import React, { useState } from 'react';
import UserMap from '../../lib/UsersMap';

// style
import '../scss/Form.scss';

function From() {
  const [login, setLogin] = useState('');
  const [password, setPasword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [findedUser, setFindedUser] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const [userDataIsCorrect, setUserDataIsCorrect] = useState(false);
  const [isResetPasswordForm, setIsResetPasswordForm] = useState(false);
  const [userInDb, setUserInDb] = useState(false);
  const [isFindUserForm, setIsFindUserForm] = useState(true);

  function handleLoginInput (event) {
    const target = event.target;
    return (
      setLogin(target.value),
      setFormSubmit(formSubmit)
    )
  }

  function handePasswordInput (event) {
    const target = event.target;
    return (
      setPasword(target.value),
      setFormSubmit(formSubmit)
    )
  }

  function handleNewPasswordInput (event) {
    const target = event.target;
    return (
      setNewPassword(target.value),
      setLogin('')
    );
  }
  
  function handleSubmit (event) {
    event.preventDefault();
    return (
      setFormSubmit(!formSubmit),
      checkInputValues()
    );
  }

  function checkInputValues () {
    if (!Boolean(password)) { return }
    if (!UserMap.has(login) || (UserMap.get(login) !== password)) {
      return setUserDataIsCorrect(userDataIsCorrect);
    }
    return setUserDataIsCorrect(!userDataIsCorrect);
  }

  function openResetPasswordForm () {
    return (
      setIsResetPasswordForm(!isResetPasswordForm),
      setPasword('')
    )
  }

  function findUser (event) {
    event.preventDefault();
    if (UserMap.has(login)) {
      return (
        setLogin(''),
        setFindedUser(login),
        setIsFindUserForm(!isFindUserForm),
        setUserInDb(!userInDb)
      )
    }
    return setIsFindUserForm(isFindUserForm);
  }

  function updatePasswordAndResetState (event) {
    event.preventDefault();
    UserMap.set(findedUser, newPassword);
    return (
      setLogin(''),
      setPasword(''),
      setNewPassword(''),
      setFindedUser(null),
      setIsResetPasswordForm(false),
      setUserInDb(false),
      setUserInDb(false),
      setIsFindUserForm(true)
    );
  }


  return (
    <div className="container form-container">
      <div className="form-container__label-wrapper">
        <span className="form-container__label_big">Bank&nbsp;</span>
        <span className="form-container__label">Support Portal</span>
      </div>
      <div className="form-container__body">
      {
        isResetPasswordForm ?
        (
          isFindUserForm && !userInDb ?
          <form onSubmit={findUser}>
            <input
              type="text"
              name="login"
              placeholder="Login"
              value={login}
              onChange={handleLoginInput}
            />
            <button
              type="submit"
              className="form__submit"
            >Find user
            </button>
          </form> :
          <form onSubmit={updatePasswordAndResetState}>
            <input
              type="password"
              name="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordInput}
            />
            <button
              type="submit"
              className="form__submit"
            >Update password
            </button>
          </form>
        ) :
        <form
          onSubmit={handleSubmit}
          className="form"
        >
          <div
            className={
              formSubmit ?
              (
                userDataIsCorrect ?
                'login login_succes' :
                'login login__fail'
              ) :
              'login'
            }
          >
          <input
            type="text"
            name="login"
            placeholder="Login"
            value={login}
            onChange={handleLoginInput}
            className={
              formSubmit ?
              (
                userDataIsCorrect ?
                'form__input form__input_succes form__login' :
                'form__input form__input_fail form__login'
              ) :
              'form__input form__login'
            }
          />
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handePasswordInput}
            className={
              formSubmit ?
              (
                userDataIsCorrect ?
                'form__input form__input_succes form__password' :
                'form__input form__input_fail form__password'
              ) :
              'form__input form__password'
            }
          />
          <button
            type="submit"
            className="form__submit"
          >Login
          </button>
        </form>
      }
        <div className="reset-pass">
          {
            !isResetPasswordForm ?
            <>
              <span className="reset-pass__label">Forgot your password?&nbsp;</span>
              <div
                className="reset-pass__action"
                onClick={openResetPasswordForm}
              >Reset it here.</div>
            </> :
            <div
              className="reset-pass__action"
              onClick={openResetPasswordForm}
            >Back to login.</div>
          }
        </div>
      </div>
    </div>
  )
}

export default From;
