const { Admin } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AdminController{
    static async getAllAdmins(req, res, next){
        try {
         const admins = await Admin.findAll();
            res.status(200).json(admins);
        } catch (error) {
            next(error);
        }
    }
    static async register(req, res, next){
        try {
            const {first_name, last_name, email, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = await Admin.create({first_name, last_name, email, username, password: hashedPassword});
            res.status(201).json(admin);
        } catch (error) {
          next(error);
        }
    }

    static async login(req, res, next){
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }
            const admin = await Admin.findOne({ where: { email } });
            if (admin) {
                const valid = await bcrypt.compare(password, admin.password);
                if (valid) {
                    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
                    return res.status(200).json({ token });
                } else {
                    throw {name: 'invalidLogin'};
                }
            } else {
                throw {name: 'notFound'};
            }
        } catch (error) {
          next(error);
        }
    }
    static async getAdmin(req, res, next){
        try {
            const { id } = req.params;
            const admin = await Admin.findOne({ where: { id } });
            if (admin) {
                res.status(200).json({ admin });
            } else {
                throw {name: 'notFound'};
            }
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = AdminController;