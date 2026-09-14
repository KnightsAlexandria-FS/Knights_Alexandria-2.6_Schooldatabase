const express = require('express');
const router = express.Router();

const schoolRoutes = require('./schoolRoutes');
const studentRoutes = require('./studentRoutes');

router.use('/schools', schoolRoutes);
router.use('/students', studentRoutes);

module.exports = router;