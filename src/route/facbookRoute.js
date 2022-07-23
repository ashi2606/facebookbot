var express = require('express');
var router = express.Router();
const facebookController = require('../controller/facebookController.js')

router.get('/webhook',facebookController.verifyWebhook);
router.post('/webhook', facebookController.validateUserMessage);

module.exports = router;