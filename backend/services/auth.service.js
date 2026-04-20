const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Client, Staff } = require('../models');

exports.registerClient = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword
    });

    await Client.create({
        id_user: newUser.id_user,
        phone_number: userData.phone_number,
        address: userData.address
    });

    return newUser;
};

exports.registerStaff = async (userData, secret) => {
    if (secret !== process.env.ADMIN_SECRET) {
        throw new Error('Invalid admin secret');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword
    });

    await Staff.create({
        id_user: newUser.id_user
    });

    return newUser;
};


exports.loginUser = async (email, password) => {
    const user = await User.findOne({
        where: { email },
        include: [{ model: Staff, as: 'Staff' }]
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const role = user.get('Staff') ? 'staff' : 'client';

    const token = jwt.sign(
        { id_user: user.id_user, role: role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { token, role };
};