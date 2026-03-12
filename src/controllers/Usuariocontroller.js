const mongoose = require('mongoose');
const usuario = require('../models/Usuarios');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../helpers/help');


// Create a registrerUsuario✅
exports.createUser = async (req, res) => {
        try {
                let { email, password } = req.body || {};
                if (!email || !password) {
                        return res.status(400).json({ message: 'Email and password are required' });
                }

                // normalize
                email = String(email).trim().toLowerCase();
                password = String(password).trim();

                // basic validations
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });
                if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

                // check existing user (case-insensitive via normalized email)
                const existing = await usuario.findOne({ email });
                if (existing) return res.status(400).json({ message: 'User already exists' });

                // hash password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                const nuevoUsuario = new usuario({
                        email,
                        password: hashedPassword
                });

                await nuevoUsuario.save();

                // generate token and return user without password
                const token = await generateJWT({ id: nuevoUsuario._id, email: nuevoUsuario.email });
                res.status(201).json({ _id: nuevoUsuario._id, email: nuevoUsuario.email, token });
        } catch (error) {
                // handle duplicate key error more gracefully
                if (error && error.code === 11000) {
                        return res.status(400).json({ message: 'User already exists' });
                }
                res.status(500).json({ message: 'Error creating user', error: error.message });
        }
};


// Login user and return JWT
exports.login = async (req, res) => {
        try {
                const { email, password } = req.body;
                if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

                const user = await usuario.findOne({ email });
                if (!user) return res.status(400).json({ message: 'Invalid credentials' });

                const match = await bcrypt.compare(password, user.password);
                if (!match) return res.status(400).json({ message: 'Invalid credentials' });

                const token = await generateJWT({ id: user._id, email: user.email });
                res.json({ token });
        } catch (error) {
                res.status(500).json({ message: 'Error logging in', error: error.message });
        }
};

// Get all users (protected)
exports.getUsers = async (req, res) => {
        try {
                const users = await usuario.find().select('-password');
                res.json(users);
        } catch (error) {
                res.status(500).json({ message: 'Error fetching users', error: error.message });
        }
};

// Get single user by id (protected)
exports.getUser = async (req, res) => {
        try {
                const { id } = req.params;
                if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
                const user = await usuario.findById(id).select('-password');
                if (!user) return res.status(404).json({ message: 'User not found' });
                res.json(user);
        } catch (error) {
                res.status(500).json({ message: 'Error fetching user', error: error.message });
        }
};

