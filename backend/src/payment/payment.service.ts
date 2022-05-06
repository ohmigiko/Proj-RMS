import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueService } from 'src/queue/queue.service';
import { User } from 'src/user/user.entity';
import { CreatePaymentDto } from './dto/createpPayment.dto';
import { Payment } from './payment.entity';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentRepository)
        public paymentRepository: PaymentRepository,
        public queueServie: QueueService
    ) { }

    async createPayment(createPaymentDto: CreatePaymentDto, id: string, user: User): Promise<Payment> {
        const queue = await this.queueServie.getQueue(id)
        console.log(queue.queue_num)
        this.queueServie.deleteQueue(id)
        return this.paymentRepository.createPayment(createPaymentDto, queue, user);
    }

    getPayment(): Promise<Payment[]> {
        return this.paymentRepository.getPayment();
    }

    getPaymentById(id: string): Promise<Payment> {
        return this.paymentRepository.getPaymentById(id);
    }
}
