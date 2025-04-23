import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.HOST),
  port: Number(getEnvVar(SMTP.PORT)),
  secure: false,
  auth: {
    user: getEnvVar(SMTP.USER),
    pass: getEnvVar(SMTP.PASSWORD),
  },
});

export const sendEmail = (data) => {
  console.log('Sending email:', data);
  transporter.sendMail(data);
};
