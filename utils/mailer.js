import nodemailer from 'nodemailer';
import { MAIL_ID, MAIL_PASSWORD } from '../config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  tls: { rejectUnauthorized: false },
  maxConnections: 5,
  maxMessages: 10,
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD,
  },
});

const createHhml = (username) => {
  return `
    <header>
      <h1>Dear, ${username}</h1>
      <p>Welcome to B&M!</p>
    </header>
    <main>
      <p>가입을 완료하기 위해 다음 링크를 눌러주세요.</p>
      <a href="#">인증하기</a>
    </main>
  `;
};

export const mailer = async ({ username, email }) => {
  const mailOption = {
    from: MAIL_ID,
    to: email,
    subject: 'B&M 가입 인증',
    test: 'B&M 가입 인증 메일입니다.',
    html: createHhml(username),
  };

  const info = await transporter.sendMail(mailOption);
};

mailer({ username: '보영스', email: 'wkdxldj25@naver.com' });
