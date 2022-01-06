'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const server = app.listen(8000);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(req.body);
  res.render('index');
});

app.post('/', (req, res) => {
  res.send(req.body);
  console.log(req.body);
  let toNumber = req.body.number;
  let text = req.body.text;
  let email = req.body.email;

 client.messages.create({
   body: text,
   from: '+12548707831',
   to: toNumber
 })
 .then(message => console.log(message.sid));

 // Transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

// Mail Options
let mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: 'Gmail Test',
  text: text,
  attachments: [{
    filename: 'Fusion360_Documentation.pdf',
    path: './attachments/Fusion360_Documentation.pdf'
}]
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
  }

  console.log('Message sent: %s', mail.messageId);
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailOptions));
});
});
