const messageService = require("../service/messageService.js")
const {VERIFY_TOKEN} = require('../config/secret.js')

// verify webhook 
const verifyWebhook = (req, res , next) =>{
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
  
    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
}

// validate user input message 
const validateUserMessage = (req, res, next) =>{
    messageService.validateUserMessage(req.body)
    res.sendStatus(200);
}


module.exports = {verifyWebhook,validateUserMessage};