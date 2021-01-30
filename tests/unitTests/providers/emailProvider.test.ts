import { connectEmailSender, emailClient } from "../../../src/providers/emailProvider";
import nodemailer from 'nodemailer'
import * as loggerProvider from '../../../src/providers/loggerProvider'
import { environment } from "../../../src/helpers/config"
import { patterns } from "../../../src/helpers/patterns";

describe('Providers - Email', () => {
    beforeAll(async () => {
        loggerProvider.config(environment.logger.level, environment.logger.file)
        connectEmailSender()
    })

    test('Email was sent', async () => {
        const message = {
            from: environment.email.defaultFrom,
            to: "receiver@sender.com",
            subject: "Message title",
            text: "Plaintext version of the message",
            html: "<p>HTML version of the message</p>"
        }

        const result = await emailClient.sendMail(message).then(info => {
            return nodemailer.getTestMessageUrl(info);
        })

        expect(result).toMatch(patterns.url)
    })
})