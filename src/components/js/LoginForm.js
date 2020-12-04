import React from 'react';

function LoginForm (props) {
  const {
    handleSubmit,
    formSubmit,
    userDataIsCorrect,
    login,
    handleLoginInput,
    password,
    handePasswordInput,

  } = props;

  return (
    <form
      onSubmit={() => handleSubmit()}
      className="form"
    >
      <div
        className={
          formSubmit ?
          (
            userDataIsCorrect ?
            'login login_succes' :
            'login login_fail'
          ) :
          'login'
        }
      >
      <input
        type="text"
        name="login"
        placeholder="E-mail"
        autoComplete="username"
        value={login}
        onChange={() => handleLoginInput()}
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
      <div
        className={
          formSubmit ?
          (
            userDataIsCorrect ?
            'login login_succes' :
            'login login_fail'
          ) :
          'login'
        }
      >
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={() => handePasswordInput()}
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
      </div>
      <button
        type="submit"
        className="form__submit"
      >Login
      </button>
    </form>
  )
}

export default LoginForm;
