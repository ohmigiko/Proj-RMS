import { DataStorageService } from "src/data-storage/data-storage.service";
import { User } from "src/user/user.entity";
import { EntityRepository, In, Not, Repository } from "typeorm";
import { CreateQueueDto } from "./dto/createQueue.dto";
import { CreateQueueDeliveryDto } from "./dto/createQueueDelivery.dto";
import { CreateQueueDineInDto } from "./dto/createQueueDineIn.dto";
import { CreateQueueTakeOutDto } from "./dto/createQueueTakeOut.dto";
import { CreateQueueWaitDineInDto } from "./dto/createQueueWaitDineIn.dto";
import { GetQueueDataDeliveryDto } from "./dto/getQueueDataDelivery.dto";
import { UpdateQueueAssignTableDto } from "./dto/updateQueueAssignTable.dto";
import { Queue } from "./queue.entity";

@EntityRepository(Queue)
export class QueueRepository extends Repository<Queue> {
    async createQueue(createQueueDto: CreateQueueDto, queue_num: string, user: User): Promise<Queue> {
        const { queue_group, order_method } = createQueueDto
        const queue = this.create({
            queue_group,
            order_method,
            queue_num,
            date_create: new Date,
            date_last_edit: new Date,
            create_by: user.name,
            is_ordered: false
        })
        await this.save(queue)
        return queue
    }

    async createQueueWaitDineIn(createQueueWaitDineInDto: CreateQueueWaitDineInDto, queue_num: string, user: User): Promise<Queue> {
        const { queue_group, num_of_customer } = createQueueWaitDineInDto
        const queue = this.create({
            queue_group,
            order_method: "wait-dine-in",
            queue_num,
            date_create: new Date,
            date_last_edit: new Date,
            create_by: user.name,
            status: 'waiting',
            num_of_customer: num_of_customer,
            is_ordered: false
        })
        await this.save(queue)
        return queue
    }

    async createQueueDineIn(createQueueDineInDto: CreateQueueDineInDto, queue_num: string, user: User, table_name: string): Promise<Queue> {
        const { table_id, queue_group, num_of_customer } = createQueueDineInDto
        const queue = this.create({
            table_id,
            table_name,
            queue_group,
            order_method: "dine-in",
            queue_num,
            date_create: new Date,
            date_last_edit: new Date,
            create_by: user.name,
            num_of_customer: num_of_customer,
            status: 'dining',
            is_ordered: false
        })
        await this.save(queue)
        console.log('create_queue_dine-in')
        return queue
    }

    async createQueueTakeOut(createQueueTakeOutDto: CreateQueueTakeOutDto, queue_num: string, user: User): Promise<Queue> {
        const { queue_group, phone } = createQueueTakeOutDto
        const queue = this.create({
            queue_group,
            order_method: "take-out",
            queue_num,
            date_create: new Date,
            date_last_edit: new Date,
            create_by: user.name,
            status: 'waiting',
            is_ordered: false,
            phone: phone
        })
        await this.save(queue)
        return queue
    }

    async createQueueDelivery(createQueueDeliveryDto: CreateQueueDeliveryDto, queue_num: string, user: User): Promise<Queue> {
        const { delivery_by, queue_group, delivery_num } = createQueueDeliveryDto
        const queue = this.create({
            queue_group,
            order_method: "delivery",
            delivery_by: delivery_by,
            queue_num,
            date_create: new Date,
            date_last_edit: new Date,
            create_by: user.name,
            status: 'waiting',
            is_ordered: false,
            // phone: phone,
            delivery_num: delivery_num
        })
        await this.save(queue)
        return queue
    }

    async updateQueueAssignTable(updateQueueAssignTableDto: UpdateQueueAssignTableDto, id: string, table_name: string): Promise<Queue> {
        const { table_id } = updateQueueAssignTableDto
        const queue = await this.findOne(id)
        queue.table_id = table_id
        queue.date_last_edit = new Date
        queue.table_name = table_name
        queue.order_method = "dine-in"
        await this.update(id, queue)
        return queue
    }

    async getQueueData_Dine_in(): Promise<Queue[]> {
        return await this.find({ where: { order_method: "dine-in", status: "dining" } })
    }

    async getQueueData_Wait_Dine_in(): Promise<Queue[]> {
        return await this.find({ where: { order_method: "wait-dine-in", status: "waiting" } })
    }

    async getQueueData_Take_Out(): Promise<Queue[]> {
        return await this.find({ where: { order_method: "take-out", status: "waiting" } })
    }

    // async getQueueData_Delivery(getQueueDataDeliveryDto: GetQueueDataDeliveryDto): Promise<Queue[]> {
    //     const { delivery_by } = getQueueDataDeliveryDto
    //     return await this.find({ where: { order_method: delivery_by } })
    // }

    async getQueueData_Delivery(): Promise<Queue[]> {
        return await this.find({ where: { order_method: "delivery", status: "waiting" } })
    }

    async getQueue(id: string): Promise<Queue> {
        return await this.findOne({
            where: { id: id },
            relations: ['order'],
        })
    }

    async updateQueueStatus(id: string): Promise<Queue> {
        const queue = await this.findOne(id)
        queue.status = 'done'
        queue.date_last_edit = new Date
        await this.update(id, queue)
        return queue
    }

    async deleteQueue(id: string) {
        return this.delete(id)
    }
}
