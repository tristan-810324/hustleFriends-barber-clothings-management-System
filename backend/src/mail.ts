import nodemailer from 'nodemailer';
import { config, isProduction } from './config.js';

const transporter = config.SMTP_HOST && config.SMTP_USER && config.SMTP_PASS
  ? nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: { user: config.SMTP_USER, pass: config.SMTP_PASS }
    })
  : null;

export async function sendCodeEmail(to: string, code: string, purpose: 'verification' | 'reset') {
  if (!transporter) {
    if (isProduction) throw new Error('Email delivery is not configured');
    console.warn(`[development OTP] ${purpose} code for ${to}: ${code}`);
    return;
  }

  await transporter.sendMail({
    from: config.SMTP_USER,
    to,
    subject: purpose === 'verification' ? 'Verify your Hustle Friends account' : 'Reset your Hustle Friends password',
    text: `Your one-time code is ${code}. It expires in 10 minutes and can only be used once.`
  });
}
