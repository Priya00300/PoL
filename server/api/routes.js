const express = require('express');
const packageController = require('../controllers/packageController');
const locationController = require('../controllers/locationController');
const qualityCheckController = require('../controllers/qualityCheckController');
const keyController = require('../controllers/keyController');

const router = express.Router();

// Package routes
router.post('/packages', packageController.createPackage);
router.get('/packages/:id', packageController.getPackage);

// Location proof routes
router.post('/location-proofs', locationController.addLocationProof);
router.get('/packages/:id/location-proofs', locationController.getLocationProofs);

// Quality check routes
router.post('/quality-checks', qualityCheckController.addQualityCheck);
router.get('/packages/:id/quality-checks', qualityCheckController.getQualityChecks);

// Key management routes
router.post('/keys/generate', keyController.generateKeyPair);

module.exports = router;