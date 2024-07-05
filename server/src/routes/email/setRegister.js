const { CodeModel } = require("../../models/code");
const nodemailer = require("nodemailer");

module.exports = {
    baseUrl: "api",
    route: "setRegister",
    method: "post",
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    run: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ success: false, message: "Please fill in all fields." });

        function generateVerificationCode() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };

        const verificationCode = generateVerificationCode();

        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            }
        });

        let mailOptions = {
            from: process.env.MAIL,
            to: email,
            subject: "Confirm Password",
            html: `
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                    <style>
                        body {
                            font-family: 'Poppins', sans-serif;
                        }
                        .container {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                        }
                        .header {
                            color: #333;
                        }
                        .content {
                            font-size: 16px;
                            color: #555;
                        }
                        .code {
                            font-size: 24px;
                            font-weight: bold;
                            color: #4CAF50;
                            text-align: center;
                            padding: 20px;
                            border-radius: 5px;
                            background-color: #f1f1f1;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2 class="header">Confirm password</h2>
                        <p class="content">
                            Hello,
                        </p>
                        <p class="content">
                            You can verify your password using the verification code below!
                        </p>
                        <div class="code">
                            ${verificationCode}
                        </div>
                        <p class="content">
                            If you did not make this request, please ignore this email. 
                        </p>
                        <p class="content">
                            Thank,<br/>Slenzy Crew
                        </p>
                    </div>
                </body>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.send({ success: false, message: "An error occurred while sending the email." });
            };
        });

        await CodeModel.updateOne(
            {
                email
            },
            {
                code: verificationCode,
            },
            { upsert: true }
        );
        return res.send({ success: true, message: "Verification code has been sent to your email.", verificationCode });
    }
};
