import Email from 'email-templates';
import { IdType } from '../models/shared_models/types/sharedTypes';
import { globalConfig } from '../server';
import { getJWTToken } from './jwtGen';
import { createTransport } from 'nodemailer';

export const sendInvitaitionMailAsync = async (userEmail: string, userFullName: string, userId: IdType) => {

    // TODO 
    return Promise.resolve();

    const mailToken = getJWTToken(
        { id: userId },
        globalConfig.mail.tokenMailSecret,
        "24h");

    const mail = getEmail();
    const signupUrl = `${globalConfig.misc.frontendUrl}/signup`;

    await mail.send({
        template: "setpassword",
        message: {
            to: userEmail,
            subject: "Értesítés a regisztrációról"
        },
        locals: {
            nev: userFullName,
            email: userEmail,
            url: `${signupUrl}?token=${mailToken}`
        }
    });
}

export const sendResetPasswordMailAsync = async (userEmail: string, userFullName: string, pwResetToken: string) => {

    const mail = getEmail();
    const url = `${globalConfig.misc.frontendUrl}/regisztracio`;

    await mail.send({
        template: "setpassword",
        message: {
            to: userEmail,
            subject: "Értesítés a regisztrációról"
        },
        locals: {
            nev: userFullName,
            email: userEmail,
            url: `${url}?token=${pwResetToken}`
        }
    });
}

const getEmail = () => new Email(getEmailConfig());

export const getEmailConfig = () => ({
    message: {
        from: globalConfig.mail.senderEmail
    },
    send: true,
    transport: createNewTransporter(
        globalConfig.mail.mailHost,
        globalConfig.mail.senderEmail,
        globalConfig.mail.senderPassword),
    views: {
        options: {
            extension: "hbs",
            map: {
                "hbs": "handlebars"
            }
        }
    },
    preview: false
});

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