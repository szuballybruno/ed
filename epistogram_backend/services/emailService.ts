import Email from 'email-templates';
import { globalConfig } from '../server';
import { createTransport } from 'nodemailer';
import { log } from './logger';

export const sendInvitaitionMailAsync = async (
    invitationToken: string, userEmail: string, userFullName: string) => {

    const signupUrl = `${globalConfig.misc.frontendUrl}/signup`;
    const invitationUrl = `${signupUrl}?token=${invitationToken}`;

    log("Invitation link: ");
    log(invitationUrl);

    // TODO mailing 
    return Promise.resolve();

    const mail = getEmail();

    await mail.send({
        template: "setpassword",
        message: {
            to: userEmail,
            subject: "Értesítés a regisztrációról"
        },
        locals: {
            nev: userFullName,
            email: userEmail,
            url: invitationUrl
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
    host: mailHost,
    port: 465,
    secure: true,
    auth: {
        user: senderMail,
        pass: pass
    },
    tls: {
        rejectUnauthorized: false
    }
});