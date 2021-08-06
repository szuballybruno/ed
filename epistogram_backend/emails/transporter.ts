import { createTransport } from 'nodemailer';
import { globalConfig } from '../server';

export const createNewTransporter = (mailHost: string, senderMail: string, pass: string) => createTransport({
    host: mailHost,//globalConfig.mail.mailHost,
    port: 465,
    secure: true,
    auth: {
        user: senderMail,//globalConfig.mail.senderEmail,
        pass: pass//globalConfig.mail.senderPassword
    },
    tls: {
        rejectUnauthorized: false
    }
});