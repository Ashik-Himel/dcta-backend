/* eslint-disable import/prefer-default-export */

import { clientDomain } from '../configs/variables.js';

export const applicationTemplateAdmin = (course) => `
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
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
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
          margin-top: 10px;
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
          <h2>New Application Received</h2>
        </div>
        <div class="content">
          <p>Dear Admin,</p>
          <p>
            A new application has been successfully submitted for the
            <strong>${course}</strong> course.
          </p>
          <p>
            Please log in to the DCTA admin panel to view and manage the
            application.
          </p>
          <a href="${clientDomain}/login" target="_blank">Go to Admin Panel</a>
          <p style="margin-top: 20px">Thank you,<br />DCTA Team</p>
        </div>
        <div class="footer">
          This is an automated notification from the DCTA website.
        </div>
      </div>
    </body>
  </html>
    `;
