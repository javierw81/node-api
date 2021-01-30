import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { environment } from '../helpers/config';
import { logger } from './loggerProvider';

enum readyStateEnum {
    connected = 1,
    disconnected = 0
}

export const statusEmail = async (): Promise<string> => {
    return emailClient.verify().then(isConnected => {
        const readyState: readyStateEnum = isConnected ? readyStateEnum.connected : readyStateEnum.disconnected
        return readyStateEnum[readyState]
    })

}

export let emailClient: Mail

export const connectEmailSender = async (): Promise<void> => {
    const mailConfig: SMTPTransport.Options = {
        host: environment.email.host,
        port: environment.email.port,
        auth: {
            user: environment.email.auth.user,
            pass: environment.email.auth.password
        }
    };

    emailClient = nodemailer.createTransport(mailConfig)

    return emailClient.verify().then(() => {
        logger.info('Email connection Ready')
    }).catch(error => {
        logger.crit('Email connection FAIL', error)
    })
}