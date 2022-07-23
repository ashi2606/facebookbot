const {ADMIN_EMAIL,API_KEY_MAILSLURP, MAILSLURP_INBOX_KEY} = require('../config/secret.js')
const MailSlurp = require("mailslurp-client").default;
const mailslurp = new MailSlurp({ apiKey: API_KEY_MAILSLURP });

async function sendEmail(product) {
    try {
        await mailslurp.sendEmail(
            MAILSLURP_INBOX_KEY,
            {
              to:[ADMIN_EMAIL],
              subject: "Messagner Order ✔",
              body:`Name: <b>${product.name}</b> <br>  Price: <b>${product.price}</b> <br> Shipping: <b>${product.shipping}</b> <br> Description: <b>${product.description}</b>`,
              html:true,
              charset: "utf8",
            },
          ); 
    } catch (error) {
      console.log(error);  
    }

}
module.exports = {sendEmail}