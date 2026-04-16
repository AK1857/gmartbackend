// repositories/user.repository.js
const User = require('../models/user');

exports.create = (data) => User.create(data);

exports.findByEmail = (email) => {
    return User.findOne({ email });
};
exports.findById = (id) => {
    return User.findById(id);
}

exports.update = (id, data) => {
    return User.updateOne({ _id: id }, data);   
};