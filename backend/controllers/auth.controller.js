const authService = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await authService.registerClient(req.body);
        res.status(201).json({
            message: "User registered successfully",
            userId: user.id_user
        });
    } catch (error) {
        next(error);
    }
};

exports.registerStaff = async (req, res, next) => {
    try {
        const { registration_key, ...userData } = req.body;
        if (registration_key !== process.env.STAFF_SECRET_KEY) {
            const error = new Error("Invalid admin secret");
            error.statusCode = 403;
            return next(error);
        }
        const user = await authService.registerStaff(userData);
        return res.status(201).json({
            message: "Staff accout created successfully",
            userId: user.id_user
        });

    } catch (error) {
        return next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json({
            message: "Login successful",
            token: result.token,
            role: result.role
        });
    } catch (error) {
        error.statusCode = 401;
        next(error);
    }
};