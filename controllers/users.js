const bcrypt = require('bcryptjs'),
    User = require('../models/users');

exports.authenticate = async (username, password) => {
    const userInstance = new User(null, null, null, username, password);
    const user = await userInstance.getOneUser();
    const { first_name, last_name, id, hash } = user;

    const valid = bcrypt.compareSync(password, user.password);
    
    if (!!valid) {
        return { isValid: valid, first_name, last_name, user_id: id };
    } else {
        return { isValid: valid }
    }
}
