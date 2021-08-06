import { globalConfig } from '../server'
import { createNewTransporter } from './transporter'

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

export const emailContent = (email: string, name: string, url: string, mailToken: string) => {
  return {
    template: "setpassword",
    message: {
      to: email,
      subject: "Értesítés a regisztrációról"
    },
    locals: {
      nev: name,
      email: email,
      url: `${url}?token=${mailToken}`
    }
  }
}
