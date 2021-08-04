import {createTransport} from 'nodemailer';
import {config} from "../configuration/config";

export const transporter = createTransport({
    host: config.mailHost,
    port: 465,
    secure: true,
    auth: {
        user: config.senderEmail,
        pass: config.senderPassword
    },
    tls: {
        rejectUnauthorized: false
    }
});