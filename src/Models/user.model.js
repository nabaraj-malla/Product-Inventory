export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addNewUser(userObj) {
    let newUser = new UserModel(
      users.length + 1,
      userObj.name,
      userObj.email,
      userObj.password
    );
    users.push(newUser);
  }

  static getAllUsers() {
    return users;
  }

  static isValidUser(email, password) {
    const loggedInUser = users.find(
      (user) => user.email == email && user.password == password
    );
    if (loggedInUser) {
      return loggedInUser;
    } else {
      return false;
    }
  }
}

let users = new Array();
