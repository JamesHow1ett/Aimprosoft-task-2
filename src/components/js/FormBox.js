import React, { useState, useEffect } from 'react';
import { usersPasswordMap, usernamesMap } from '../../lib/UsersMap';
import initialStateValues from '../../lib/initialState';

// components
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import ResetPassControls from './ResetPassControls';
import Welcome from './Welcome';

// style
import '../scss/FormBox.scss';

const initState = initialStateValues();

function FormBox () {
  const [login, setLogin] = useState(initState.login);
  const [password, setPasword] = useState(initState.password);
  const [newPassword, setNewPassword] = useState(initState.newPassword);
  const [findedUser, setFindedUser] = useState(initState.findedUser);
  const [formSubmit, setFormSubmit] = useState(initState.formSubmit);
  const [userDataIsCorrect, setUserDataIsCorrect] = useState(initState.userDataIsCorrect);
  const [isResetPasswordForm, setIsResetPasswordForm] = useState(initState.isResetPasswordForm);
  const [userInDb, setUserInDb] = useState(initState.userInDb);
  const [isFindUserForm, setIsFindUserForm] = useState(initState.isFindUserForm);
  const [isSuccesLogin, setIsSuccesLogin] = useState(initState.isSuccesLogin);
  const [username, setUsername] = useState(initState.username);
  const [noFindUser, setNoFindUser] = useState(initState.noFindUser);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (userDataIsCorrect) {
        setIsSuccesLogin(true);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [userDataIsCorrect]);

  function handleLoginInput (event) {
    const target = event.target;
    return (
      setLogin(target.value),
      setFormSubmit(false),
      setUserDataIsCorrect(false),
      setNoFindUser(false)
    );
  }

  function handePasswordInput (event) {
    const target = event.target;
    return (
      setPasword(target.value),
      setFormSubmit(false),
      setUserDataIsCorrect(false)
    );
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
    if (!password) {
      return;
    }
    if (!usersPasswordMap.has(login) || (usersPasswordMap.get(login).password !== password)) {
      return setUserDataIsCorrect(userDataIsCorrect);
    }
    return (
      setUserDataIsCorrect(!userDataIsCorrect),
      setUsername(usernamesMap.get(login).username)
    );
  }

  function openResetPasswordForm () {
    if (isResetPasswordForm) {
      setLogin('');
    }
    return (
      setIsResetPasswordForm(!isResetPasswordForm),
      setPasword(''),
      setFindedUser(initState.findedUser),
      setUserInDb(initState.userInDb),
      setIsFindUserForm(true)
    );
  }

  function findUser (event) {
    event.preventDefault();
    if (usersPasswordMap.has(login)) {
      return (
        setLogin(''),
        setFindedUser(login),
        setIsFindUserForm(!isFindUserForm),
        setUserInDb(!userInDb)
      );
    }
    return (
      setNoFindUser(true),
      setIsFindUserForm(isFindUserForm)
    );
  }

  function updatePasswordAndResetState (event) {
    event.preventDefault();
    usersPasswordMap.set(findedUser, { password: newPassword });
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

  function logout () {
    return (
      setLogin(initState.login),
      setPasword(initState.password),
      setNewPassword(initState.newPassword),
      setFindedUser(initState.findedUser),
      setFormSubmit(initState.formSubmit),
      setUserDataIsCorrect(initState.userDataIsCorrect),
      setIsResetPasswordForm(initState.isResetPasswordForm),
      setUserInDb(initState.userInDb),
      setIsFindUserForm(initState.isFindUserForm),
      setIsSuccesLogin(initState.isSuccesLogin),
      setUsername(initState.username),
      setNoFindUser(initState.noFindUser)
    );
  }

  return (
    <div className='container form-container'>
      <div className='form-container__label-wrapper'>
        <span className='form-container__label_big'>Bank&nbsp;</span>
        <span className='form-container__label'>Support Portal</span>
      </div>
      {isSuccesLogin
        ? <Welcome
            username={username}
            logout={logout}
          />
        : <div className='form-container__body'>
          {isResetPasswordForm
            ? <ResetPasswordForm
                isFindUserForm={isFindUserForm}
                login={login}
                newPassword={newPassword}
                noFindUser={noFindUser}
                userInDb={userInDb}
                findUser={findUser}
                handleLoginInput={handleLoginInput}
                handleNewPasswordInput={handleNewPasswordInput}
                updatePasswordAndResetState={updatePasswordAndResetState}
              />
            : <LoginForm
                formSubmit={formSubmit}
                login={login}
                password={password}
                userDataIsCorrect={userDataIsCorrect}
                handleLoginInput={handleLoginInput}
                handePasswordInput={handePasswordInput}
                handleSubmit={handleSubmit}
              />}
          <ResetPassControls
            isResetPasswordForm={isResetPasswordForm}
            openResetPasswordForm={openResetPasswordForm}
          />
        </div>}
    </div>
  );
}

export default FormBox;
