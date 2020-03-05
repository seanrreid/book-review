const db = require('../config/conn'),
  bcrypt = require('bcryptjs');

class User {
  constructor(id, first_name, last_name, email, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }

  async saveUser() {
    try {
      const response = await db.one(
        `insert into users 
            (first_name, last_name, email, password) 
        values 
            ($1, $2, $3, $4) 
        returning id`,
        [this.first_name, this.last_name, this.email, this.password]
      );
      console.log('user was created with id:', response.id);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  async login() {
    try {
      const userData = await db.one(
        `select 
            id,
            first_name,
            last_name,
            password
        from users where 
            email = $1`,
        [this.email]
      );
      const valid = this.checkPassword(userData.password);
      if (!!valid) {
        const { first_name, last_name, id } = userData;
        return { isValid: valid, first_name, last_name, user_id: id };
      } else {
        return { isValid: valid };
      }
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = User;
