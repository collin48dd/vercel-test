/* 'use strict'; */


const express = require('express');
const app = express();
const morgan = require('morgan');
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const cors = require("cors");


require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

/* const bodyParser = require('body-parser');
const ejs = require('ejs'); */



/* app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public')); */
app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
/* app.use(bodyParser.urlencoded({ extended: true })); */

app.get('/', (req, res) => {
    res.send(req.body);
});

app.post('/text', (req, res) => {
    res.send(req.body);
    console.log(req.body);
    let toNumber = req.body.number;
    let text = req.body;

    client.messages.create({
            body: 'text',
            from: '+12548707831',
            to: '+14072272030'
        })
        .then(message => console.log(message.sid));
});

app.post('/mail', (req, res) => {
    res.send(req.body);
    console.log(req.body);
    let toNumber = req.body.number;
    let text = req.body.text;
    /* 
        client.messages.create({body: text, from: '+12548707831',   to: '+14072272030'  }).then(message => console.log(message.sid)); */
});

async function mailer() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL, // Generate etheral user
            pass: process.env.PASS, // Generate etheral password
        },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Devusol" <devusolmailer@gmail.com>', // Sender address
        to: "cdillenseger48@gmail.com, jedarbyshire@gmail.com", // Recievers
        subject: "Nodemailer Test", // Subject line
        text: "hot dogs", // Plain text body
        //html: "<b>Hello World?</b>", // Html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

app.listen(5000);