const numberInput = document.getElementById('number');
const textInput = document.getElementById('msg');
const button = document.getElementById('button');

//const accountSid = process.env.TWILIO_ACCOUNT_SID;
//const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = require('twilio')('', '');

button.addEventListener('click', send, false);
