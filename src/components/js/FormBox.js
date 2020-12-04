import React, { useState } from 'react';
import UserMap from '../../lib/UsersMap';

// components
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPassControls from './ResetPassControls';

// style
import '../scss/FormBox.scss';

function FormBox () {
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
      setFormSubmit(false),
      setUserDataIsCorrect(false)
    )
  }

  function handePasswordInput (event) {
    const target = event.target;
    return (
      setPasword(target.value),
      setFormSubmit(false),
      setUserDataIsCorrect(false)
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
    if (isResetPasswordForm) {
      setLogin('');
    }
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
          <ResetPasswordForm 
            isFindUserForm={isFindUserForm}
            login={login}
            newPassword={newPassword}
            userInDb={userInDb}
            findUser={findUser}
            handleLoginInput={handleLoginInput}
            handleNewPasswordInput={handleNewPasswordInput}
            updatePasswordAndResetState={updatePasswordAndResetState}
          /> :
          <LoginForm
            formSubmit={formSubmit}
            login={login}
            password={password}
            userDataIsCorrect={userDataIsCorrect}
            handleLoginInput={handleLoginInput}
            handePasswordInput={handePasswordInput}
            handleSubmit={handleSubmit}
          />
        }
        <ResetPassControls
          isResetPasswordForm={isResetPasswordForm}
          openResetPasswordForm={openResetPasswordForm}
        />
      </div>
    </div>
  )
}

export default FormBox;
