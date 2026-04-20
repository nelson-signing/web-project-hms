const { User, Client, Staff } = require('../models');

exports.getUserProfile = async (userId, role) => {
    const ProfileModel = (role === 'staff') ? Staff : Client;

    return await User.findByPk(userId, {
        attributes: ['id_user', 'first_name', 'last_name', 'email'],
        include: [{
            model: ProfileModel,
            attributes: {exclude: ['id_user', 'createdAt', 'updatedAt']}
        }]
    });
};

exports.updateUserProfile = async (userId, role, updateData) => {
    const ProfileModel = (role === 'staff') ? Staff : Client;

    await User.update({
        first_name: updateData.first_name,
        last_name: updateData.last_name,
        email: updateData.email
    }, { where: { id_user: userId } });

    await ProfileModel.update(updateData, {
        where: { id_user: userId }
    });

    return await this.getUserProfile(userId, role);
};

exports.deleteUserAccount = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    const userName = `${user.first_name} ${user.last_name}`;
    await user.destroy();

    return userName;
};