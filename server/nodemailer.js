const nodemailer = require("nodemailer");

async function main() {
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

main().catch(console.error);