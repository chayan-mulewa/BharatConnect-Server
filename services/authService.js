// services/authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models/index');
const { JWTKey, BharatConnect } = require('../config/index');

const signup = async (full_name, email, username, password, profile_photo) => {

    const existingEmail = await Users.findOne({ email });
    if (existingEmail) {
        return { success: false, error: 'email', message: 'Email is already taken', data: '' };
    }

    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
        return { success: false, error: 'username', message: 'Username is already taken', data: '' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users({ full_name, email, username, password: hashedPassword, profile_photo });
    await user.save();
    return { success: true, error: '', message: 'Username is created', data: '' };
};

const signin = async (username, password) => {
    const user = await Users.findOne({ username });
    if (!user) {
        return { success: false, error: 'username', message: 'Username is invalid', data: '' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return { success: false, error: 'password', message: 'Password is invalid', data: '' };
    }

    const token = await jwt.sign({ userId: user._id }, JWTKey, { expiresIn: '30d' });
    return { success: true, error: '', message: '', data: token };
};


const validateToken = async (req) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { success: false, error: 'token', message: 'Invalid credentials', data: token };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodeToken = await jwt.verify(token, JWTKey);
        const userId = decodeToken.userId;
        return { success: true, error: '', message: '', data: userId };
    } catch (error) {
        return { success: false, error: 'token', message: 'Invalid credentials', data: '' };
    }
};

const validateEmail = async (email) => {

    const existingEmail = await Users.findOne({ email });
    if (!existingEmail) {
        return { success: false, error: 'email', message: 'Email is invalid', data: '' };
    }

    return { success: true, error: '', message: 'Email is valid', data: '' };
};

const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: BharatConnect.email,
                pass: BharatConnect.password
            }
        });

        let mailOptions = {
            from: BharatConnect.email,
            to: email,
            subject: 'BharatConnect Reset Password',
            text: `Your OTP for password reset is : ${otp}`,
            replyTo: null
        };

        await transporter.sendMail(mailOptions);

        return { success: true, error: '', message: 'Email is send', data: '' }
    } catch (error) {
        return { success: false, error: 'email', message: 'Email is not send', data: '' }

    }
};

const resetPassword = async (email, newPassword) => {
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return { success: false, error: 'Password', message: 'Password is not reset', data: '' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await Users.findOneAndUpdate({ email }, { password: hashedPassword });

        return { success: true, error: '', message: 'Password is reset successfully', data: '' };
    } catch (error) {
        return { success: false, error: 'password', message: 'Password is not reset', data: '' };
    }
};

const updateProfile = async (profile_photo, full_name, email, username, password, userId) => {
    const existingEmail = await Users.findOne({ email, _id: { $ne: userId } });
    if (existingEmail) {
        return { success: false, error: 'email', message: 'Email is already taken', data: '' };
    }

    const existingUsername = await Users.findOne({ username, _id: { $ne: userId } });
    if (existingUsername) {
        return { success: false, error: 'username', message: 'Username is already taken', data: '' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.findByIdAndUpdate(userId, {
        full_name, email, username, password: hashedPassword, profile_photo
    });
    return { success: true, error: '', message: 'Username is Updated', data: '' };
}

module.exports = { signup, signin, validateToken, validateEmail, sendOTP, resetPassword, updateProfile };
