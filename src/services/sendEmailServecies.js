import nodemailer from 'nodemailer';

export async function sendEmailService({
  to,
  subject,
  message,
  attachments = [],
} = {}) {
  try {
    // SMTP transport configurations
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Correct Gmail SMTP server
      port: 587, // Port for TLS (secure: false)
      secure: false, // Use TLS, not SSL
      service: 'gmail', // Optional, Gmail service
      auth: {
        // Gmail credentials
        user: 'eslamhussin600@gmail.com',
        pass: 'vsry dfhe auqv yyxz', // Be careful with hardcoded passwords; environment variables are safer
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates (useful in development)
      },
    });

    // Send mail using the transporter
    const emailInfo = await transporter.sendMail({
      from: '"3amo Keta 👻" <eslamhussin600@gmail.com>', // Sender address
      to: to || '', // Receiver (required)
      subject: subject || 'Hello', // Subject line
      html: message || '', // HTML body (you can also use 'text' for plain text emails)
      attachments, // Optional attachments
    });

    // If email is successfully accepted by the server
    if (emailInfo.accepted.length) {
      console.log('Email sent successfully:', emailInfo.response);
      return true;
    }

    console.log('Email was not accepted:', emailInfo);
    return false;
  } catch (error) {
    console.error('Error while sending email:', error.message);
    return false;
  }
}
