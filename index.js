

var app = require('express')();
const bodyParser = require('body-parser');

const facbookRoute = require('./src/route/facbookRoute.js')
require('dotenv').config();

const port = 3000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/',facbookRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 