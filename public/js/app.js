var numberField = document.querySelector('input[name=number]');
var textField = document.querySelector('input[name=text]');
var button = document.querySelector('input[type=button]');
var msg = document.querySelector('.response');
const nodemailer = require("nodemailer");

textField.addEventListener('keyup', function(e) {
    if ((e.keyCode || e.charCode) === 13) send();
}, false); // when a user presses a Return key

button.addEventListener('click', send, false); // when a user click the "Send" button

function send() {
    var number = numberField.value.replace(/\D/g, ''); // Remove all non-numeric chars
    var text = textField.value;
    // ... will send the form using fetch here
    fetch('/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: '+1' + number, text: text })
        })
        .then(function(res) { console.log(res) })
        .catch(function(error) { console.log(error) });
}

async function mailer() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user, // Generate etheral user
            pass: testAccount.pass, // Generate etheral password
        },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Devusol" <info@devusol.com>', // Sender address
        to: "cdillenseger48@gmail.com, jedarbyshire@gmail.com", // Recievers
        subject: "Nodemailer Test", // Subject line
        text: "hot dogs", // Plain text body
        html: "<b>Hello World?</b>", // Html body
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}