import nodemailer from 'nodemailer';
import { fileURLToPath } from 'node:url';
import { config, isProduction } from './config.js';

const logoPath = fileURLToPath(new URL('../../frontend/public/img/HustleLogoBlack.png', import.meta.url));
const logoContentId = 'hustle-friends-logo';

const transporter = config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS
  ? nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASS }
    })
  : null;

function buildCodeEmail(code: string, purpose: 'verification' | 'reset') {
  const isVerification = purpose === 'verification';
  const title = isVerification ? 'Verify your email address' : 'Reset your password';
  const intro = isVerification
    ? 'Thanks for joining Hustle Friends. Use the verification code below to activate your account.'
    : 'We received a request to reset your Hustle Friends password. Use the code below to continue.';
  const ignoreMessage = isVerification
    ? 'If you did not create a Hustle Friends account, you can safely ignore this email.'
    : 'If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.';
  const subject = isVerification
    ? `Your Hustle Friends verification code: ${code}`
    : `Your Hustle Friends password reset code: ${code}`;
  const text = `${title}\n\n${intro}\n\nYour one-time code is ${code}. It expires in 10 minutes and can only be used once.\n\nFor your security, never share this code with anyone.\n\n${ignoreMessage}`;

  // Email clients have limited CSS support, so the layout uses tables and inline styles.
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title>${title}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f1eb; color:#1c1917; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
      ${isVerification ? 'Verify your Hustle Friends account' : 'Complete your Hustle Friends password reset'} with code ${code}.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; background-color:#f4f1eb;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%; max-width:600px;">
            <tr>
              <td align="center" style="padding:0 8px 18px;">
                <img src="cid:${logoContentId}" width="240" alt="Hustle Friends" style="display:block; width:240px; max-width:100%; height:auto; border:0; outline:none; text-decoration:none;">
              </td>
            </tr>
            <tr>
              <td style="overflow:hidden; border-radius:16px; background-color:#ffffff; box-shadow:0 8px 24px rgba(28,25,23,0.08);">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="height:6px; background-color:#c6a664; font-size:0; line-height:0;">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding:40px 40px 32px;">
                      <p style="margin:0 0 12px; color:#a17d3f; font-size:11px; font-weight:700; letter-spacing:1.6px; line-height:16px; text-transform:uppercase;">Secure account access</p>
                      <h1 style="margin:0; color:#1c1917; font-size:28px; font-weight:700; letter-spacing:-0.4px; line-height:36px;">${title}</h1>
                      <p style="margin:18px 0 0; color:#57534e; font-size:16px; line-height:25px;">${intro}</p>

                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                        <tr>
                          <td align="center" style="border:1px solid #eadfca; border-radius:12px; background-color:#faf7f1; padding:22px 16px;">
                            <p style="margin:0 0 8px; color:#78716c; font-size:11px; font-weight:700; letter-spacing:1.4px; line-height:16px; text-transform:uppercase;">Your one-time code</p>
                            <p style="margin:0; color:#1c1917; font-family:'Courier New', Courier, monospace; font-size:32px; font-weight:700; letter-spacing:8px; line-height:40px;">${code}</p>
                          </td>
                        </tr>
                      </table>

                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:22px;">
                        <tr>
                          <td valign="top" style="padding:2px 10px 0 0; color:#a17d3f; font-size:16px; line-height:20px;">&#9201;</td>
                          <td style="color:#57534e; font-size:14px; line-height:21px;"><strong style="color:#292524;">Valid for 10 minutes.</strong> This code can only be used once.</td>
                        </tr>
                      </table>

                      <div style="margin-top:28px; border-top:1px solid #e7e5e4; padding-top:22px;">
                        <p style="margin:0; color:#78716c; font-size:13px; line-height:20px;"><strong style="color:#57534e;">Keep your account secure:</strong> Hustle Friends will never ask for this code by call, text, or chat. Do not share it with anyone.</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 0; color:#78716c; font-size:12px; line-height:18px; text-align:center;">
                <p style="margin:0;">${ignoreMessage}</p>
                <p style="margin:12px 0 0; color:#a8a29e;">&copy; ${new Date().getFullYear()} Hustle Friends Co. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}

export async function sendCodeEmail(to: string, code: string, purpose: 'verification' | 'reset') {
  if (!transporter) {
    if (isProduction) throw new Error('Email delivery is not configured');
    console.warn(`[development OTP] ${purpose} code for ${to}: ${code}`);
    return;
  }

  const email = buildCodeEmail(code, purpose);

  await transporter.sendMail({
    from: config.SMTP_USER,
    to,
    ...email,
    attachments: [
      {
        filename: 'HustleLogoBlack.png',
        path: logoPath,
        cid: logoContentId
      }
    ]
  });
}
