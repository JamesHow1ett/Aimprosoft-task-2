// emulate user data in db

const usersPassword = [
  ['user@mail.ua', {
    password: '12345'
  }],
  ['login322@fake.mail', {
    password: '1488'
  }]
];

const usernames = [
  ['user@mail.ua', {
    username: 'Bob'
  }],
  ['login322@fake.mail', {
    username: 'Aimprosoft'
  }]
];

const usersPasswordMap = new Map(usersPassword);
const usernamesMap = new Map(usernames);

export { usersPasswordMap, usernamesMap} ;