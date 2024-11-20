const express = require('express');
const router = express.Router();
const shortLinkController = require('../controllers/shortLinkController')
router.post('/generate', shortLinkController.generate);
router.get('/parse', shortLinkController.parse);
router.post('/operate', shortLinkController.operate);
router.get('/list', shortLinkController.queryList);

module.exports = router;
