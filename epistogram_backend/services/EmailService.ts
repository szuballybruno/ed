import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';
import { User } from '../models/entity/User';
import { EpistoEmail } from '../models/EpistoEmail';
import { replaceAll } from '../utilities/helpers';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { AssetUrlService } from './misc/urlProvider';

export class EmailService {

    private _config: GlobalConfiguration;
    private _assetUrlService: AssetUrlService;

    constructor(config: GlobalConfiguration, assetUrlService: AssetUrlService) {

        this._config = config;
        this._assetUrlService = assetUrlService;
    }

    sendInvitaitionMailAsync = async (
        invitationToken: string,
        userEmail: string,
        userFullName: string) => {

        const url = `${this._config.misc.frontendUrl}/registration?token=${invitationToken}&isInvited=true`;

        const epistoEmail = {
            to: userEmail,
            subject: "Üdvözlünk az EpistoGram-ban!",
            template: {
                name: "invitationEmailTemplate",
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl("images/logo.png"),
                    userFullName: userFullName,
                    registrationUrl: url
                }
            }
        } as EpistoEmail;

        await this.sendMailNewAsync(epistoEmail);
    }

    sendSuccessfulRegistrationEmailAsync = async (
        user: User,
        generatedPassword: string) => {

        const epistogramAppUrl = this._config.misc.frontendUrl;
        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: "Üdvözlünk az EpistoGram-ban!",
            template: {
                name: "successfulRegistrationEmailTemplate",
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl("images/logo.png"),
                    generatedPassword: generatedPassword,
                    epistogramAppUrl: epistogramAppUrl
                }
            }
        } as EpistoEmail;

        await this.sendMailNewAsync(epistoEmail);
    }

    sendResetPasswordMailAsync = async (user: User, resetPasswordUrl: string) => {

        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: "Jelszó visszaállítása",
            template: {
                name: "resetPasswordEmailTemplate",
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl("images/logo.png"),
                    passwordResetUrl: resetPasswordUrl
                }
            }
        } as EpistoEmail;

        await this.sendMailNewAsync(epistoEmail);
    }

    sendDiscountCodePurchasedMailAsync = async (user: User, discountCode: string) => {

        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: "Bonusz kod megveve",
            template: {
                name: "discountCodePurchasedMailTemplate",
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl("images/logo.png"),
                    discountCode
                }
            }
        } as EpistoEmail;

        await this.sendMailNewAsync(epistoEmail);
    }

    private sendMailNewAsync = async (email: EpistoEmail) => {

        const transporter = createTransport({
            host: this._config.mail.mailHost,
            port: 465,
            secure: true,
            auth: {
                user: this._config.mail.senderEmail,
                pass: this._config.mail.senderPassword
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const to = this._config
            .misc
            .isLocalhost
            ? "manyoki.bence@epistogram.com"
            : email.to;

        const templatePath = `${__dirname}/../emails/${email.template.name}.html`;
        const templateHtml = readFileSync(templatePath, 'utf8');
        let replacedHtml = "" + templateHtml;

        const templateParams = email.template.params;
        for (const paramName in templateParams) {
            if (Object.prototype.hasOwnProperty.call(templateParams, paramName)) {

                const paramValue = templateParams[paramName];
                const replaceTag = `{{${paramName}}}`;

                replacedHtml = replaceAll(replacedHtml, replaceTag, paramValue);
            }
        }

        const result = await transporter
            .sendMail({
                to: to,
                from: "noreply@epistogram.com",
                subject: email.subject,
                html: replacedHtml
            });
    }
}