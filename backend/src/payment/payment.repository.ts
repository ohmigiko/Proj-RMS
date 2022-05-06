import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/createpPayment.dto";
import { Payment } from "./payment.entity";

@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {
    async createPayment(createPaymentDto: CreatePaymentDto, queue, user: User): Promise<Payment> {
        const { method } = createPaymentDto
        const { queue_num, queue_group, order, table_id, table_name, order_method, delivery_by } = queue
        const date = new Date
        let total_payed = 0
        for (let i = 0; i < order.length; i++) {
            total_payed += order[i].price
        }
        const payment = this.create({
            method: method,
            total_payed: total_payed,
            queue_num: queue_num,
            queue_group: queue_group,
            Order: order,
            table_id: table_id,
            table_name: table_name,
            date_create: date,
            date_last_edit: date,
            order_method: order_method,
            create_by: user.name,
            delivery_by: delivery_by
        })
        await this.save(payment)
        return payment
    }

    async getPayment(): Promise<Payment[]> {
        return this.find();
    }

    async getPaymentById(id: string): Promise<Payment> {
        return this.findOne(id, { relations: [] });
    }
}
