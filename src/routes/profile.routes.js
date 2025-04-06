const express = require('express');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.get('/me', auth, profileController.getProfile);
router.patch('/me', auth, profileController.updateProfile);

module.exports = router;