const constant = require('../config/constant.js');
const productList = require("../../files/product.json")
const axios = require('axios');
const NodeCache = require("node-cache");
const cache = new NodeCache();
const { PAGE_ACCESS_TOKEN } = require('../config/secret.js')
const sendEmail = require("../config/emailConfig.js")

function validateUserMessage(data) {
  try {
    if (data.object === 'page') {
      data.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event) {
          var recipientId = event.sender.id;
          if (event.message && (constant.greetingMessage.includes(event.message.text.toLowerCase()))) {
            greetingReply(recipientId)
          } else if (event.message && (constant.productInfoMessage.includes(event.message.text.split(" ")[0]))) {
            getProductInfoByUserInput(event, recipientId)
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }

}

function greetingReply(recipientId) {
  try {
    var randomNumber = Math.floor(Math.random() * constant.greetingMessage.length);
    var messageText = constant.greetingReply[randomNumber];
    sendMessage(recipientId, messageText);
  } catch (error) {
    console.log(error);
  }

}

function getProductInfoByUserInput(event, recipientId) {
  try {
    const productTag = event.message.text.split(" ")[0];
    const productId = event.message.text.split(" ")[1];
    let productInfoMessage;
    let product = {}
    let cacheProduct = cache.get(`${productId}`);
    if (cacheProduct) {
      product = cacheProduct;
    } else {
      productList.forEach(element => {
        if (element.sku == productId) { product = element; cache.set(`${productId}`, element) };
      });
    }
    if (productTag === "/buy") {
      sendEmail.sendEmail(product);
      productInfoMessage = "order placed "
    } else {
      switch (productTag) {
        case '/price':
          productInfoMessage = product.price;
          break;
        case '/desc':
          productInfoMessage = product.description;
          break;
        case '/shipping':
          productInfoMessage = product.shipping;
          break;
        default:
          break;
      }
    }
    sendMessage(recipientId, productInfoMessage);
  } catch (error) {
    console.log(error);
  }

}

function sendMessage(recipientId, messageText) {
  try {
    var messageBody = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };
    const params = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      data: messageBody,
    }
    axios(`https://graph.facebook.com/v14.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, params)
      .then(function (response) {
        console.log(response.data);
      }).catch((error) => {
        console.log(error);
      })
  } catch (error) {
    console.log(error);
  }

}

module.exports = { validateUserMessage }