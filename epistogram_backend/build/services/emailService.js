"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTransporter = exports.getEmailConfig = exports.sendResetPasswordMailAsync = exports.sendInvitaitionMailAsync = void 0;
const email_templates_1 = __importDefault(require("email-templates"));
const nodemailer_1 = require("nodemailer");
const staticProvider_1 = require("../staticProvider");
const logger_1 = require("./misc/logger");
const sendInvitaitionMailAsync = (invitationToken, userEmail, userFullName) => __awaiter(void 0, void 0, void 0, function* () {
    const signupUrl = `${staticProvider_1.staticProvider.globalConfig.misc.frontendUrl}/signup`;
    const invitationUrl = `${signupUrl}?token=${invitationToken}`;
    logger_1.log("Invitation link: ");
    logger_1.log(invitationUrl);
    const mail = getEmail();
    yield mail.send({
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
});
exports.sendInvitaitionMailAsync = sendInvitaitionMailAsync;
const sendResetPasswordMailAsync = (userEmail, userFullName, pwResetToken) => __awaiter(void 0, void 0, void 0, function* () {
    const mail = getEmail();
    const url = `${staticProvider_1.staticProvider.globalConfig.misc.frontendUrl}/regisztracio`;
    yield mail.send({
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
});
exports.sendResetPasswordMailAsync = sendResetPasswordMailAsync;
const getEmail = () => new email_templates_1.default(exports.getEmailConfig());
const getEmailConfig = () => ({
    message: {
        from: "noreply@epistogram.com"
    },
    send: true,
    transport: exports.createNewTransporter(staticProvider_1.staticProvider.globalConfig.mail.mailHost, staticProvider_1.staticProvider.globalConfig.mail.senderEmail, staticProvider_1.staticProvider.globalConfig.mail.senderPassword),
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
exports.getEmailConfig = getEmailConfig;
const createNewTransporter = (mailHost, senderMail, pass) => nodemailer_1.createTransport({
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
exports.createNewTransporter = createNewTransporter;
//# sourceMappingURL=emailService.js.map