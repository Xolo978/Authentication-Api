import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { User } from "../models/User.js";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
export const sendEmail = async (user: User, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const verificationUrl = `${process.env.DOMAIN}/verify-email?token=${token}`;
  const mailOptions: MailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "Email Verification",
    text: `Click on the link to verify your email ${verificationUrl}`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
            line-height: 1.6;
            color: #666666;
        }
        .button {
            display: inline-block;
            padding: 12px 25px;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #45a049;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888888;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Email Verification
        </div>
        <div class="content">
            <p>Hello ${user.username},</p>
            <p>Thank you for registering! To complete the sign-up process, please click the button below to verify your email address.</p>
            <p>Or copy and paste this link in your browser:</p>
<p><a href="${verificationUrl}">${verificationUrl}</a></p>
        </div>
        <div class="footer">
            <p>If you did not create an account, no further action is required.</p>
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
