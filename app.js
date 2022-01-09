/* const express = require('express');

const server = app.listen(8080); */

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');

require('dotenv').config();

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(fileUpload());
//app.use(express.urlencoded()); 

//app.use(express.static(__dirname + '/../public'));

/* app.get('/:base_url/:sub_url', (req, res) => {
    res.json({
        message: 'hit the json'
      });
}); */



app.get('/', (req, res) => {
    console.log(req.body);
    res.json({
        message: 'please send a post request instead'
    });
});

app.post('/request', (req, res) => {
    console.log("test");
    let text = `${req.body.name} ${req.body.lastName} has requested a driver. Please check your email`
    let email = ` Name: ${req.body.name} ${req.body.lastName}
    Phone Number: ${req.body.phone}
    Email: ${req.body.email}
    Dealership: ${req.body.dealership}
    Number of Drivers: ${req.body.numberDrive}
    Service Needed: ${req.body.serviceNeeded}
    Destination: ${req.body.location}
    Exact Address: ${req.body.address}
    Need a Quote: ${req.body.quote}
    Date Needed: ${req.body.dateTime}
    Agreed to Terms of Service: ${req.body.haveRead}`

    client.messages.create({
            body: 'text',
            from: '+12548707831',
            to: '+14072272030'
        })
        .then(message => console.log(message.sid));

    // Mail Options
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'jedarbyshire@gmail.com',
        subject: 'Driver Requested',
        text: email
    };

    sendEmail(mailOptions);
    res.send(req.body);
});

app.post('/contact', (req, res) => {
    console.log(req.body);
    // Mail Options
    let mailOptions = {
        from: process.env.EMAIL,
        to: 'jedarbyshire@gmail.com',
        subject: 'Please contact me about a specific request',
        text: req.body.message
    };
    sendEmail(mailOptions);

});

app.post('/login', (req, res) => {

    if ((process.env.UN != req.body.username) || process.env.PASS != req.body.password) {
        console.log("rejected");
        res.send('unauthorized user');
    }
});

app.post('/upload', function(req, res) {
    let sampleFile = req.files.sampleFile;
    let uploadPath = '/Users/jedar/Desktop/Devusol/webDev/vercel-test/uploads/' + sampleFile.name;

    console.log(req.body);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);

        res.send('File uploaded!');
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: 'jedarbyshire@gmail.com',
        subject: 'Auto Attachment',
        text: "no text for now",
        attachments: [{
            filename: sampleFile.name,
            path: uploadPath
        }]
    };
    sendEmail(mailOptions);
});

function sendEmail(mailOptions) {
    // Transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', mail.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailOptions));
    });
}


app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});