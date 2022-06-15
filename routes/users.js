const express = require('express');
const router = express.Router();

const {
    _insertUser,
    _authenticateUser,
    _getUserData,
    _logout,
} = require('../services/users');

router.post('/signup', _insertUser);
router.post('/signin', _authenticateUser);
router.get('/dashboard', _getUserData);
router.get('/logout', _logout);

module.exports = router;