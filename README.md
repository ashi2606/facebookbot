# facebookbot


## Setup

Clone the repo:
```
cd ./<project directory>
git clone https://github.com/ashi2606/facebookbot.git
```

Application will be served on http://localhost:3000


## Scripts

| Script           | Description                                     |
| ---------------- | ----------------------------------------------- |
| `npm start`      | Start project|
| `npm run product` | fetch product list form url and store in local file  files/project.json |
| `npm run find:transactions` | Assessment-2  sort transactions in time asc order |




## Environment variables

Create a `.env` in the root directory and set the following variables.
```
VERIFY_TOKEN= random string need to verify on facebook webhook
PAGE_ACCESS_TOKEN= facebook page access token
ADMIN_EMAIL= Email to send order place
API_KEY_MAILSLURP=get from mailslurp account after sign up
MAILSLURP_INBOX_KEY= create index in mailslurp and get id
```

## Developer guidelines

**Send mail using api refer services**
https://www.mailslurp.com/

**Access facebook message in local using this service **
```
Step 1 - download in local machine from url  https://ngrok.com
Step 2 - open application and run command ngrok http {your application port number}
Step 3 - GEt https URL and set into facebook webhook 
```
**Setup Facebook webhook **

https://developers.facebook.com/docs/messenger-platform/webhook



