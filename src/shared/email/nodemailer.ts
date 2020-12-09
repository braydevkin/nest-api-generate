import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import {
  EMAIL_EMAIL,
  MAILGUN_PRIVATE_API_KEY,
  MAILGUN_DOMAIN,
} from '@config/Constants';

const auth = {
  service: 'mailgun',
  secure: true,
  auth: {
    api_key: MAILGUN_PRIVATE_API_KEY,
    domain: MAILGUN_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export async function sendEmail(
  to: string,
  subject: string,
  message: string,
): Promise<boolean> {
  const options = {
    from: EMAIL_EMAIL,
    to,
    subject,
    html: message,
  };
  return await nodemailerMailgun
    .sendMail(options)
    .then(res => {
      console.log(`Email enviado com sucesso para ${to}`);
      return true;
    })
    .catch(err => {
      console.log(`Falha ao enviar email para ${to}`);
      return false;
    });
}
export async function sendProducerInviteEmail(to: string, url: string): Promise<boolean> {
  return await sendEmail(
    to,
    'Venha ser um Produtor',
    `<h1>Por favor clique abaixo para cadastrar se como produtor < /h>${url}`,
  );
}