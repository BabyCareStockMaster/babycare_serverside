const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findOne({ where: { id } });
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
    }
    catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async register(req, res) {
        try {
            const { first_name, last_name, email, password, address } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ first_name, last_name, email, password: hashedPassword, address });
            res.status(201).json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ where: { email } });
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            if (valid) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
                return res.status(200).json({ token });
            } else {
                return res.status(400).json({ error: 'Invalid Password' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { first_name, last_name, email, password, address } = req.body;
            const user = await User.findOne({ where: { id } });
            if (user) {
                user.first_name = first_name;
                user.last_name = last_name;
                user.email = email;
                user.password = password;
                user.address = address;
                await user.save();
                res.status(200).json({ user });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;