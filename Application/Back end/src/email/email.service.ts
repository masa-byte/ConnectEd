import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
          host: '',
          port: '',
          tls: {
            rejectUnauthorized: true,
            minVersion: "TLSv1.2"
            },
          secure: false,
          auth: {
            user: '',
            pass: '',
          },
        });
      }

    async sendEmail(to: string, subject: string, text: string) {
        try{
            await this.transporter.sendMail({
                from: 'ConnectEd',
                to,
                subject,
                text,
                html: `<p>${text}</p></br>
                <p>ConnectEd Team</p></br>`
            });
        } catch (error) {
            console.log(error);
        }
    }
    
}
