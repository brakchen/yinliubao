const express = require('express');
const router = express.Router();
const shortLinkController = require('../controllers/shortLinkController')
router.post('/generate', shortLinkController.generate);
router.get('/parse', shortLinkController.parse);
router.post('/operate', shortLinkController.operate);

module.exports = router;
