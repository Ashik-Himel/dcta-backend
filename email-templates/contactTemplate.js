/* eslint-disable import/prefer-default-export */

export const contactTemplate = (name, email, subject, message) => `
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
          width: 100%;
          padding: 1rem;
        }
        .email-container {
          width: 100%;
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
        }
        .field {
          margin-bottom: 15px;
        }
        .field label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }
        .field span {
          display: block;
          background-color: #faf0f0;
          color: #555;
          padding: 10px;
          border-radius: 4px;
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
          <h2>New Contact Message</h2>
        </div>
        <div class="content">
          <div class="field">
            <label>Name</label>
            <span>${name}</span>
          </div>
          <div class="field">
            <label>Email</label>
            <span>${email}</span>
          </div>
          <div class="field">
            <label>Subject</label>
            <span>${subject}</span>
          </div>
          <div class="field">
            <label>Message</label>
            <span>${message}</span>
          </div>
        </div>
        <div class="footer">
          This message was sent from DCTA website contact form.
        </div>
      </div>
    </body>
  </html>
  `;
