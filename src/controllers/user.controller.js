// controllers/user.controller.js
const userService = require('../services/user.service');

exports.createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) => {
    // Implement update logic
    try {
        // Placeholder for update logic
        let user = await userService.updateUser(req.body);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User updated', data: user });
    }
    catch (err) {
        next(err);
    }
}