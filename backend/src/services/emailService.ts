import nodemailer from 'nodemailer';
import { ContactFormData, NewsletterData, EmailTemplate } from '../types';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    console.log('🔧 Initializing email service...');
    console.log('📧 Email service:', process.env.EMAIL_SERVICE);
    console.log('📧 Email user:', process.env.EMAIL_USER);
    console.log('📧 Contact email:', process.env.CONTACT_EMAIL);
    this.transporter = this.createTransporter();
  }

  private createTransporter(): nodemailer.Transporter {
    // Use hardcoded Gmail credentials for ARIS
    return nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'arisinfo.in@gmail.com', // ARIS Gmail address
        pass: 'yqhs zvme mbfy geos' // ARIS Gmail App Password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactFormEmail(data: ContactFormData): Promise<boolean> {
    try {
      const subject = `New Contact Form Submission - ${data.source.toUpperCase()}`;
      const html = this.generateContactFormHTML(data);
      const text = this.generateContactFormText(data);

      const emailData: EmailTemplate = {
        to: 'arisinfo.in@gmail.com',
        subject,
        html,
        text
      };

      await this.sendEmail(emailData);
      return true;
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return false;
    }
  }

  async sendNewsletterConfirmation(data: NewsletterData): Promise<boolean> {
    try {
      const subject = 'Welcome to ARIS AI Data Analyst Newsletter!';
      const html = this.generateNewsletterHTML(data);
      const text = this.generateNewsletterText(data);

      const emailData: EmailTemplate = {
        to: data.email,
        subject,
        html,
        text
      };

      await this.sendEmail(emailData);
      return true;
    } catch (error) {
      console.error('Error sending newsletter confirmation:', error);
      return false;
    }
  }

  async sendRoadmapSelectionEmail(data: any): Promise<boolean> {
    try {
      const subject = `New Roadmap Selection - ${data.type.toUpperCase()}`;
      const html = this.generateRoadmapHTML(data);
      const text = this.generateRoadmapText(data);

      const emailData: EmailTemplate = {
        to: 'arisinfo.in@gmail.com',
        subject,
        html,
        text
      };

      await this.sendEmail(emailData);
      return true;
    } catch (error) {
      console.error('Error sending roadmap selection email:', error);
      return false;
    }
  }

  private async sendEmail(emailData: EmailTemplate): Promise<void> {
    const mailOptions = {
      from: 'arisinfo.in@gmail.com',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    };

    console.log('📧 Sending email:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    await this.transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully');
  }

  private generateContactFormHTML(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #f97316; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🚀 New Contact Form Submission</h2>
            <p>Source: ${data.source.toUpperCase()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${data.company}</div>
            </div>
            ` : ''}
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${data.phone}</div>
            </div>
            ` : ''}
            ${data.service ? `
            <div class="field">
              <div class="label">Service Interest:</div>
              <div class="value">${data.service}</div>
            </div>
            ` : ''}
            ${data.course ? `
            <div class="field">
              <div class="label">Course Interest:</div>
              <div class="value">${data.course}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${data.message}</div>
            </div>
            <div class="field">
              <div class="label">Timestamp:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateContactFormText(data: ContactFormData): string {
    return `
New Contact Form Submission - ${data.source.toUpperCase()}

Name: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}` : ''}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.service ? `Service Interest: ${data.service}` : ''}
${data.course ? `Course Interest: ${data.course}` : ''}
Message: ${data.message}

Timestamp: ${new Date().toLocaleString()}
    `;
  }

  private generateNewsletterHTML(data: NewsletterData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🎉 Welcome to ARIS AI Data Analyst!</h2>
          </div>
          <div class="content">
            <p>Thank you for subscribing to our newsletter!</p>
            <p>You'll receive the latest updates on:</p>
            <ul>
              <li>AI and Data Analytics trends</li>
              <li>New training programs and courses</li>
              <li>Industry insights and best practices</li>
              <li>Exclusive offers and early access to new content</li>
            </ul>
            <p>Stay tuned for valuable content delivered straight to your inbox!</p>
            <p>Best regards,<br>The ARIS Team</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateNewsletterText(data: NewsletterData): string {
    return `
Welcome to ARIS AI Data Analyst!

Thank you for subscribing to our newsletter!

You'll receive the latest updates on:
- AI and Data Analytics trends
- New training programs and courses
- Industry insights and best practices
- Exclusive offers and early access to new content

Stay tuned for valuable content delivered straight to your inbox!

Best regards,
The ARIS Team
    `;
  }

  private generateRoadmapHTML(data: any): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #f97316; }
          .value { margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🗺️ New Roadmap Selection</h2>
            <p>Type: ${data.type.toUpperCase()}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Roadmap Type:</div>
              <div class="value">${data.type}</div>
            </div>
            ${data.email ? `
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            ` : ''}
            ${data.name ? `
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            ` : ''}
            ${data.preferences && data.preferences.length > 0 ? `
            <div class="field">
              <div class="label">Preferences:</div>
              <div class="value">${data.preferences.join(', ')}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Timestamp:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateRoadmapText(data: any): string {
    return `
New Roadmap Selection

Type: ${data.type}
${data.email ? `Email: ${data.email}` : ''}
${data.name ? `Name: ${data.name}` : ''}
${data.preferences && data.preferences.length > 0 ? `Preferences: ${data.preferences.join(', ')}` : ''}

Timestamp: ${new Date().toLocaleString()}
    `;
  }
}

export default new EmailService();
