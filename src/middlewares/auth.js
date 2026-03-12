const jwt = require('jsonwebtoken');
const express = require('express');
const { generateJWT } = require('../helpers/help');

const secret = process.env.JWT_SECRET || 'default_secret';

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Login handler provided by middleware (exported)
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    // payload can be minimal; real validation should be in controller
    const payload = { email, password };
    const token = await generateJWT(payload);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
};

module.exports = auth;