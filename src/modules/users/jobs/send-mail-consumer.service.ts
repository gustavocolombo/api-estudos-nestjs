import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

@Processor('send-mail-queue')
export class SendMailConsumerService {
  constructor(private mailerService: MailerService) {}

  @Process('send-mail-job')
  async createEmail(job: Job<Partial<ICreateUserDTO>>) {
    const { data } = job;

    const mail = await this.mailerService.sendMail({
      from: 'Gustavo Rocha',
      to: data.email,
      subject: 'Welcome to my test!',
      text: 'Enjoy the party!',
    });

    return mail;
  }
}
