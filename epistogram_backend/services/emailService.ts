import Email from 'email-templates';
import { createTransport } from 'nodemailer';
import { User } from '../models/entity/User';
import { staticProvider } from '../staticProvider';
import { getAssetUrl } from './misc/urlProvider';

type EpistoEmail = {

    to: string;
    subject: string;
    template: {
        name: string;
        params: any;
    }
}

export const sendInvitaitionMailAsync = async (
    invitationToken: string, userEmail: string, userFullName: string) => {

    const url = `${staticProvider.globalConfig.misc.frontendUrl}/registration?token=${invitationToken}&isInvited=true`;

    const epistoEmail = {
        to: userEmail,
        subject: "Értesítés a regisztrációról",
        template: {
            name: "invitationEmailTemplate",
            params: {
                nev: userFullName,
                email: userEmail,
                url: url
            }
        }
    } as EpistoEmail;

    await sendEpistoEmailAsync(epistoEmail);
}

export const sendSuccessfulRegistrationEmailAsync = async (
    user: User,
    generatedPassword: string,
    epistogramAppUrl: string) => {

    const { email, firstName, lastName } = user;

    const epistoEmail = {
        to: email,
        subject: "Sikeres regisztracio!",
        template: {
            name: "successfulRegistrationEmailTemplate",
            params: {
                epistogramLogoUrl: getAssetUrl("images/logo.png"),
                generatedPassword: generatedPassword,
                epistogramAppUrl: epistogramAppUrl
            }
        }
    } as EpistoEmail;

    await sendEpistoEmailAsync(epistoEmail);
}

export const sendResetPasswordMailAsync = async (user: User, resetPasswordUrl: string) => {

    const { email, firstName, lastName } = user;

    const epistoEmail = {
        to: email,
        subject: "Jelszó visszaállítása",
        template: {
            name: "resetPasswordEmailTemplate",
            params: {
                epistogramLogoUrl: getAssetUrl("images/logo.png"),
                passwordResetUrl: resetPasswordUrl
            }
        }
    } as EpistoEmail;

    await sendEpistoEmailAsync(epistoEmail);
}

export const sendEpistoEmailAsync = async (epistoEmail: EpistoEmail) => {

    const mail = getEmail();
    const to = staticProvider
        .globalConfig
        .misc
        .isLocalhost
        ? "manyoki.bence@epistogram.com"
        : epistoEmail.to;

    await mail.send({
        template: epistoEmail.template.name,
        message: {
            from: "noreply@epistogram.com",
            to: to,
            subject: epistoEmail.subject
        },
        locals: epistoEmail.template.params
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