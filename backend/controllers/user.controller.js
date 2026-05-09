const userService = require('../services/user.service');

exports.getClients = async (req, res, next) => {
    try {
        const clients = await userService.getAllClients();
        res.status(200).json(clients);
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const { id_user, role } = req.user;
        const user = await userService.getUserProfile(id_user, role);
        if (!user) {
            return res.status(404).json({
                error: "Not Found",
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Profile accessed",
            user: user
        });
    } catch (error) {
        next(error);
    }
};

exports.updateMe = async (req, res, next) => {
    try {
        const { id_user, role } = req.user;
        const updatedUser = await userService.updateUserProfile(id_user, role, req.body);
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteMe = async (req, res, next) => {
    try {
        const userName = await userService.deleteUserAccount(req.user.id_user);
        res.status(200).json({
            message: `Account for ${userName} has been successfully deleted.`
        });
    } catch (error) {
        next(error);
    }
};