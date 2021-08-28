import Email from 'email-templates';
import { createTransport } from 'nodemailer';
import { staticProvider } from '../staticProvider';
import { log } from './misc/logger';

export const sendInvitaitionMailAsync = async (
    invitationToken: string, userEmail: string, userFullName: string) => {

    const signupUrl = `${staticProvider.globalConfig.misc.frontendUrl}/signup`;
    const invitationUrl = `${signupUrl}?token=${invitationToken}`;

    log("Invitation link: ");
    log(invitationUrl);
    
    const mail = getEmail();

    await mail.send({
        template: "setpassword",
        message: {
            from: "noreply@epistogram.com",
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
    const url = `${staticProvider.globalConfig.misc.frontendUrl}/regisztracio`;

    await mail.send({
        template: "setpassword",
        message: {
            from: "noreply@epistogram.com",
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
        from: "noreply@epistogram.com"
    },
    send: true,
    transport: createNewTransporter(
        staticProvider.globalConfig.mail.mailHost,
        staticProvider.globalConfig.mail.senderEmail,
        staticProvider.globalConfig.mail.senderPassword),
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