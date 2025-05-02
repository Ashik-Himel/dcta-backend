/* eslint-disable import/prefer-default-export */

export const resetPasswordTemplate = ({ resetLink }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
          background-color: #faf0f0;
          padding: 1rem;
        }
        .email-container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #ff1e1e;
          color: white;
          text-align: center;
          padding: 20px 15px;
        }
        .content {
          padding: 20px;
          color: #333;
          line-height: 1.6;
        }
        .content > * {
          margin-bottom: 12px;
        }
        .content a {
          display: inline-block;
          padding: 8px 12px;
          background-color: #ff1e1e;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          font-size: 14px;
        }
        .content a:hover {
          background-color: #e60000;
        }
        .footer {
          background-color: #ff1e1e;
          color: white;
          text-align: center;
          font-size: 14px;
          padding: 15px 20px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h2>Password Reset Request</h2>
        </div>
        <div class="content">
          <p>Dear User,</p>
          <p>
            You recently requested to reset your DCTA account password. Click the
            button below to reset your password:
          </p>
          <a href="${resetLink}" target="_blank">Reset Password</a>
          <p style="margin-top: 16px">
            This link will expire in one hour for security reasons.
          </p>
          <p>
            If you did not request a password reset, please ignore this email or
            contact support if you're concerned.
          </p>
          <br />
          <p>Best regards,<br />DCTA Team</p>
        </div>
        <div class="footer">
          This is an automated message. Please do not reply.
        </div>
      </div>
    </body>
  </html>
  `;
