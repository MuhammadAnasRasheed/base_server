import dotenvFlow from 'dotenv-flow'

dotenvFlow.config()

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    //Email
    // EMAIL_API_KEY: process.env.EMAIL_SERVICE_API_KEY,

    SMTP_HOST:process.env.SMTP_HOST,
    SMTP_PORT:process.env.SMTP_PORT,
    SMTP_USER:process.env.SMTP_USER,
    SMTP_PASS:process.env.SMTP_PASS,
    SMTP_FROM:process.env.SMTP_FROM,


    //Tokens
    TOKENS: {
        ACCESS: {
            SECRET: process.env.ACCESS_TOKEN_SECRET as string,
            EXPIRY: 3600
        },
        REFRESH: {
            SECRET: process.env.REFRESH_TOKEN_SECRET as string,
            EXPIRY: 3600 * 24 * 365
        }
    }
}
