import {createTransport} from 'nodemailer';
import { mailHost, senderEmail, senderPassword } from '../services/environment';

export const transporter = createTransport({
    host: mailHost,
    port: 465,
    secure: true,
    auth: {
        user: senderEmail,
        pass: senderPassword
    },
    tls: {
        rejectUnauthorized: false
    }
});