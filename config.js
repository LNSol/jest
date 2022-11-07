import { config } from 'dotenv';
config();

export const { PORT } = process.env;
export const { GOOGLE_APP_KEY, MAIL_ID, MAIL_PASSWORD } = process.env;
