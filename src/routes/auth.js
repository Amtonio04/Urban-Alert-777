const express = require('express');
const router = express.Router();
const Usuariocontroller = require('../controllers/Usuariocontroller');
const auth = require('../middlewares/auth');

// Register
router.post('/register', Usuariocontroller.createUser);

// Login handled by middleware login handler
if (auth && auth.login) {
	router.post('/login', auth.login);
} else {
	router.post('/login', Usuariocontroller.login);
}

// Get all users (protected)
router.get('/users', auth, Usuariocontroller.getUsers);

// Get single user by id (protected)
router.get('/users/:id', auth, Usuariocontroller.getUser);

module.exports = router;
