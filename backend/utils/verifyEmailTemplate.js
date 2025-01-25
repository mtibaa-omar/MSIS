export function verifyEmailTemplate({ actionUrl, name }) {
  return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>Verify your email address</title>
          <style>
            * { font-family: Arial, sans-serif; box-sizing: border-box; }
            body { margin: 0; background-color: #f5f7f9; color: #839197; }
            a { color: #414ef9; }
            .email-wrapper { width: 100%; margin: 0; padding: 0; background-color: #f5f7f9; }
            .email-body { background-color: #ffffff;width: 100%; padding: 30px; border-top: 1px solid #e7eaec; }
            .email-body h1 { color: #292e31; font-size: 19px; font-weight: bold; }
            .email-footer { text-align: center; padding: 20px; color: #839197; font-size: 12px; }
            .button { display: inline-block; width: 200px; background-color: #414ef9; color: #fff; text-align: center; line-height: 45px; text-decoration: none; border-radius: 3px; }
            @media only screen and (max-width: 600px) { .email-body { padding: 15px; } .button { width: 100%; } }
          </style>
        </head>
        <body>
          <table class="email-wrapper" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <table class="email-body" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <h1>Verify your email address</h1>
                      <p>Thanks ${name} for signing up for MSIS! We're excited to have you as an early user.</p>
                      <a href="${actionUrl}" class="button">Verify Email</a>
                      <p>Thanks, <br />The MSIS Team</p>
                      <p>If you’re having trouble, <a href="${actionUrl}">${actionUrl}</a></p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-footer">
                <p>MSIS <br />Tunis,Sfax , Route Menzel Chaker Km 4.5</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
}
