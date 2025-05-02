/* eslint-disable import/prefer-default-export */

export const applicationTemplateStudent = ({ fullName, course }) => `
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
          <h2>Application Submitted</h2>
        </div>
        <div class="content">
          <p>Dear ${fullName},</p>
          <p>
            Thank you for applying to the <strong>${course}</strong> course at
            DCTA.
          </p>
          <p>
            We have received your application and our team will review it shortly.
            You will be contacted via email once a decision has been made.
          </p>
          <p>
            If you have any questions in the meantime, feel free to contact us.
          </p>
          <br />
          <p>Best regards,<br />DCTA Team</p>
        </div>
        <div class="footer">This is a confirmation message from DCTA.</div>
      </div>
    </body>
  </html>
    `;
