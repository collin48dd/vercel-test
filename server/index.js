'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const server = app.listen(8080);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
  let toNumber = req.body.number;
  let text = req.body.text;

 client.messages.create({
   body: text,
   from: '+12548707831',
   to: toNumber
 })
 .then(message => console.log(message.sid));
});