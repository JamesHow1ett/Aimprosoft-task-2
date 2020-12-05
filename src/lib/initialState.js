// initial state value

const initialStateValues = () => {
  return {
    login: '',
    password: '',
    newPassword: '',
    findedUser: null,
    username: null,
    formSubmit: false,
    userDataIsCorrect: false,
    isResetPasswordForm: false,
    userInDb: false,
    isSuccesLogin: false,
    isFindUserForm: true,
    noFindUser: false
  }
}

export default initialStateValues;