const express = require('express');
const router = express.Router();

const {
    _scan,
} = require('../services/scanners');

router.post('/scanners', _scan)

module.exports = router;