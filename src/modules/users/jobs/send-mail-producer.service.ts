import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

@Injectable()
export class SendMailProducerService {
  constructor(@InjectQueue('send-mail-queue') private queue: Queue) {}

  async execute({ name, email }: Partial<ICreateUserDTO>) {
    return await this.queue.add('send-mail-job', { name, email });
  }
}
