import nodemailer from 'nodemailer'
import config from '../config/config'

const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: Number(config.SMTP_PORT || 587),
    secure: Number(config.SMTP_PORT || 587) === 465,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
    }
})

const verifySMTP = async () => {
    try {
        await transporter.verify()
        console.log('Brevo SMTP connection successful')
    } catch (error) {
        console.error('Brevo SMTP connection failed:', error)
    }
}

void verifySMTP()

export default {
    sendEmail: async (to: string[], subject: string, text: string) => {
        try {
            await transporter.sendMail({
                from: config.SMTP_FROM,
                to,
                subject,
                text
            })
        } catch (error) {
            throw error
        }
    }
}
