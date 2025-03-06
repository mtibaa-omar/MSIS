// forgotPasswordTemplate.js
export const forgotPasswordTemplate = (resetLink) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
    <style type="text/css">
      /* Inline CSS for email compatibility */
      body {
        margin: 0;
        padding: 0;
        background-color: #f7f7f7;
        font-family: Arial, sans-serif;
      }
      .email-container {
        width: 100%;
        padding: 20px;
        background-color: #f7f7f7;
      }
      .email-content {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        padding: 30px;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
      }
      .header h1 {
        font-size: 24px;
        color: #333333;
        margin: 0;
      }
      .body-text {
        font-size: 16px;
        color: #555555;
        line-height: 1.5;
        padding-bottom: 20px;
      }
      .button-container {
        text-align: center;
        padding-bottom: 20px;
      }
      .reset-button {
        display: inline-block;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
        font-weight: bold;
      }
      .footer {
        font-size: 14px;
        color: #777777;
        word-break: break-all;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-content">
        <div class="header">
          <h1>Reset Your Password</h1>
        </div>
        <div class="body-text">
          <p>
            We received a request to reset your password. Click the button
            below to reset your password. If you didn't request a password reset,
            you can safely ignore this email.
          </p>
        </div>
        <div class="button-container">
          <a class="reset-button" href="${resetLink}">
            Reset Password
          </a>
        </div>
        <div class="footer">
          <p>
            If the button above does not work, copy and paste the following link
            into your browser:
          </p>
          <p>${resetLink}</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
