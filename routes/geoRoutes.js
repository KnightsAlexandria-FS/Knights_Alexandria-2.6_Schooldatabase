const express = require('express');
const router = express.Router();
const geoController = require('../controllers/geoController');

router.get('/fetch', geoController.fetchExternalGeoData);
router.get('/', geoController.getAllGeoData);
router.post('/', geoController.saveGeoData);
router.get('/:id', geoController.getGeoDataById);

module.exports = router;