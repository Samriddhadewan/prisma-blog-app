import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

// If your Prisma file is located elsewhere, you can change the path

const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure, // false
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt:"select_account consent",
      accessType: "offline",
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"PRISMA BLOG" <prismaBlog@sam.email>',
          to: user.email,
          subject: "Please Verify your email",
          html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      .logo {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #2f80ed;
        margin-bottom: 20px;
      }
      h1 {
        font-size: 22px;
        color: #333333;
      }
      p {
        font-size: 15px;
        color: #555555;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin: 25px 0;
        padding: 12px 24px;
        background-color: #2f80ed;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-size: 16px;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #999999;
        text-align: center;
      }
      .link {
        word-break: break-all;
        font-size: 13px;
        color: #2f80ed;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">PRISMA BLOG</div>

      <h1>Verify your email address</h1>

      <p>
        Hello 👋  ${user.name}<br /><br />
        Thanks for signing up for <strong>PRISMA BLOG</strong>.
        Please confirm your email address by clicking the button below.
      </p>

      <div style="text-align: center">
        <a href="${verificationUrl}" class="btn">Verify Email</a>
      </div>

      <p>
        If the button doesn’t work, copy and paste the following link into your browser:
      </p>

      <p class="link">${verificationUrl}</p>

      <p>
        This link will expire in a limited time for security reasons.
        If you didn’t create an account, you can safely ignore this email.
      </p>

      <div class="footer">
        © 2025 PRISMA BLOG. All rights reserved.
      </div>
    </div>
  </body>
</html>
`, // HTML version of the message
        });

        console.log("Message sent", info.messageId);

        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});
