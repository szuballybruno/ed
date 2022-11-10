import { readFileSync } from 'fs';
import { createTransport } from 'nodemailer';
import { User } from '../models/entity/misc/User';
import { EpistoEmail } from '../models/EpistoEmail';
import { Id } from '@episto/commontypes';
import { replaceAll } from '../utilities/helpers';
import { DomainProviderService } from './DomainProviderService';
import { GlobalConfiguration } from './misc/GlobalConfiguration';
import { UrlService } from './UrlService';
import path from 'path';

export class EmailService {

    constructor(
        private _config: GlobalConfiguration,
        private _assetUrlService: UrlService,
        private _domainProviderService: DomainProviderService) {

    }

    sendInvitaitionMailAsync = async (
        invitationToken: string,
        userEmail: string,
        userFullName: string,
        comapnyId: Id<'Company'>) => {

        const domain = await this
            ._domainProviderService
            .getDomainByCompanyAsync(comapnyId);

        const url = `${domain}/registration?token=${invitationToken}&isInvited=true`;

        const epistoEmail = {
            to: userEmail,
            subject: 'Üdvözlünk az EpistoGram-ban!',
            template: {
                name: 'invitationEmailTemplate',
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl('images/logo.png'),
                    userFullName: userFullName,
                    registrationUrl: url
                }
            }
        } as EpistoEmail;

        await this.sendMailAsync(epistoEmail);
    };

    sendSuccessfulRegistrationEmailAsync = async (
        user: User,
        generatedPassword: string) => {

        const domain = await this
            ._domainProviderService
            .getDomainAsync(user.id);

        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: 'Üdvözlünk az EpistoGram-ban!',
            template: {
                name: 'successfulRegistrationEmailTemplate',
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl('images/logo.png'),
                    generatedPassword: generatedPassword,
                    epistogramAppUrl: domain
                }
            }
        } as EpistoEmail;

        await this.sendMailAsync(epistoEmail);
    };

    sendResetPasswordMailAsync = async (user: User, resetPasswordUrl: string) => {

        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: 'Jelszó visszaállítása',
            template: {
                name: 'resetPasswordEmailTemplate',
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl('images/logo.png'),
                    passwordResetUrl: resetPasswordUrl
                }
            }
        } as EpistoEmail;

        await this.sendMailAsync(epistoEmail);
    };

    sendDiscountCodePurchasedMailAsync = async (
        toEmail: string,
        discountCode: string,
        itemName: string,
        detailsUrl: string,
        itemCoverUrl: string) => {

        const epistoEmail = {
            to: toEmail,
            subject: 'Bónusz kód megvéve',
            template: {
                name: 'discountCodePurchasedMailTemplate',
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl('images/logo.png'),
                    discountCode: discountCode,
                    itemCoverUrl: itemCoverUrl,
                    itemName: itemName,
                    detailsUrl: detailsUrl
                }
            }
        } as EpistoEmail;

        await this.sendMailAsync(epistoEmail);
    };

    sendSelfPasswordResetMailAsync = async (user: User, resetPwUrl: string) => {

        const { email, firstName, lastName } = user;

        const epistoEmail = {
            to: email,
            subject: 'Jelszo visszaallitas',
            template: {
                name: 'selfResetPasswordEmailTemplate',
                params: {
                    epistogramLogoUrl: this._assetUrlService.getAssetUrl('images/logo.png'),
                    passwordResetUrl: resetPwUrl
                }
            }
        } as EpistoEmail;

        await this.sendMailAsync(epistoEmail);
    };

    /**
     * Sends the mail.
     */
    private sendMailAsync = async (email: EpistoEmail) => {

        try {

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

            const isLocalhost = this
                ._config
                .misc
                .isLocalhost;

            const to = isLocalhost
                ? 'spengler.manfred@epistogram.com'
                : email.to;

            const rootParentPath = path.resolve(this._config.rootDirectory, '../')

            const templatePath = `${rootParentPath}/emails/${email.template.name}.html`;
            const templateHtml = readFileSync(templatePath, 'utf8');
            let replacedHtml = '' + templateHtml;

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
                    from: 'noreply@epistogram.com',
                    subject: email.subject,
                    html: replacedHtml
                });
        }
        catch (e: any) {

            throw new Error('Nodemailed error. Msg: ' + e.message);
        }
    };
}