const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAdmin = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const admin = new Admin({
            login: req.body.login,
            password: hashedPassword,
            role: req.body.role,
        });
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        if (!admins) {
            return res.status(404).json('No admins found');
        }
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json('No admins found');
        }
        await admin.deleteOne();
        res.status(200).json('Admin has been deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const admin = await Admin.findOne({ login: req.body.login });
        if (!admin) {
            return res.status(404).json('Admin not found');
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            admin.password
        );
        if (!validPassword) {
            return res.status(400).json('Wrong password');
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAdmin, getAllAdmins, deleteAdmin, login };
