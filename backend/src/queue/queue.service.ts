import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataStorageService } from 'src/data-storage/data-storage.service';
import { TableModule } from 'src/table/table.module';
import { TableService } from 'src/table/table.service';
import { User } from 'src/user/user.entity';
import { CreateQueueDto } from './dto/createQueue.dto';
import { CreateQueueDeliveryDto } from './dto/createQueueDelivery.dto';
import { CreateQueueDineInDto } from './dto/createQueueDineIn.dto';
import { CreateQueueTakeOutDto } from './dto/createQueueTakeOut.dto';
import { CreateQueueWaitDineInDto } from './dto/createQueueWaitDineIn.dto';
import { GetQueueDataDeliveryDto } from './dto/getQueueDataDelivery.dto';
import { UpdateQueueAssignTableDto } from './dto/updateQueueAssignTable.dto';
import { Queue } from './queue.entity';
import { QueueRepository } from './queue.repository';

@Injectable()
export class QueueService {
    constructor(
        private dataStorageService: DataStorageService,
        private tableService: TableService,
        @InjectRepository(QueueRepository)
        public queueRepository: QueueRepository,
    ) { }

    async createQueue(@Body() createQueueDto: CreateQueueDto, user: User): Promise<Queue> {
        const queue_num = await this.dataStorageService.dataStorageRepository.findOne({ where: { name: 'queue_num' } })
        if (!queue_num) {
            await this.dataStorageService.createDataStorage({ name: 'queue_num', data: '1' })
            const new_num = parseInt('1') + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueue(createQueueDto, '1', user)

        }
        else {
            const new_num = parseInt(queue_num.data) + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueue(createQueueDto, queue_num.data, user)
        }
    }

    async createQueueWaitDineIn(@Body() createQueueWaitDineInDto: CreateQueueWaitDineInDto, user: User): Promise<Queue> {
        const queue_num = await this.dataStorageService.dataStorageRepository.findOne({ where: { name: 'queue_num' } })
        if (!queue_num) {
            await this.dataStorageService.createDataStorage({ name: 'queue_num', data: '1' })
            const new_num = parseInt('1') + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueWaitDineIn(createQueueWaitDineInDto, '1', user)

        }
        else {
            const new_num = parseInt(queue_num.data) + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueWaitDineIn(createQueueWaitDineInDto, queue_num.data, user)
        }
    }

    async createQueueDineIn(@Body() createQueueDineInDto: CreateQueueDineInDto, user: User): Promise<Queue> {
        const table = await this.tableService.tableRepository.findOne(createQueueDineInDto.table_id, {
            relations: ['queue'],
        })
        if (table.queue.length >= 4) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Table is Full',
            }, HttpStatus.FORBIDDEN);
        }
        const queue_num = await this.dataStorageService.dataStorageRepository.findOne({ where: { name: 'queue_num' } })
        if (!queue_num) {
            await this.dataStorageService.createDataStorage({ name: 'queue_num', data: '1' })
            const new_num = parseInt('1') + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueDineIn(createQueueDineInDto, '1', user, table.name)

        }
        else {
            const new_num = parseInt(queue_num.data) + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueDineIn(createQueueDineInDto, queue_num.data, user, table.name)
        }
    }

    async createQueueTakeOut(@Body() createQueueTakeOutDto: CreateQueueTakeOutDto, user: User): Promise<Queue> {
        const queue_num = await this.dataStorageService.dataStorageRepository.findOne({ where: { name: 'queue_num' } })
        if (!queue_num) {
            await this.dataStorageService.createDataStorage({ name: 'queue_num', data: '1' })
            const new_num = parseInt('1') + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueTakeOut(createQueueTakeOutDto, '1', user)

        }
        else {
            const new_num = parseInt(queue_num.data) + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueTakeOut(createQueueTakeOutDto, queue_num.data, user)
        }
    }

    async createQueueDelivery(@Body() createQueueDeliveryDto: CreateQueueDeliveryDto, user: User): Promise<Queue> {
        const queue_num = await this.dataStorageService.dataStorageRepository.findOne({ where: { name: 'queue_num' } })
        console.log(createQueueDeliveryDto.delivery_by)
        if (!queue_num) {
            await this.dataStorageService.createDataStorage({ name: 'queue_num', data: '1' })
            const new_num = parseInt('1') + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueDelivery(createQueueDeliveryDto, '1', user)

        }
        else {
            const new_num = parseInt(queue_num.data) + 1
            await this.dataStorageService.editDataStorage({ name: 'queue_num', data: new_num.toString() })
            return this.queueRepository.createQueueDelivery(createQueueDeliveryDto, queue_num.data, user)
        }
    }

    async updateQueueAssignTable(@Body() updateQueueAssignTableDto: UpdateQueueAssignTableDto, id: string): Promise<Queue> {
        const table = await this.tableService.tableRepository.findOne(updateQueueAssignTableDto.table_id, {
            relations: ['queue'],
        })
        if (table.queue.length >= 4) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Table is Full',
            }, HttpStatus.FORBIDDEN);
        }
        return this.queueRepository.updateQueueAssignTable(updateQueueAssignTableDto, id, table.name)
    }

    updateQueueStatus(id: string): Promise<Queue> {
        return this.queueRepository.updateQueueStatus(id)
    }

    resetQueue() {
        return this.dataStorageService.editDataStorage({ name: 'queue_num', data: '1' })
    }

    getQueueNum() {
        return this.dataStorageService.getDataStorage({ "name": "queue_num" })
    }

    getQueueData_Dine_in(): Promise<Queue[]> {
        return this.queueRepository.getQueueData_Dine_in()
    }

    getQueueData_Wait_Dine_in(): Promise<Queue[]> {
        return this.queueRepository.getQueueData_Wait_Dine_in()
    }

    getQueueData_Take_Out(): Promise<Queue[]> {
        return this.queueRepository.getQueueData_Take_Out()
    }

    // getQueueData_Delivery(getQueueDataDeliveryDto: GetQueueDataDeliveryDto): Promise<Queue[]> {
    //     return this.queueRepository.getQueueData_Delivery(getQueueDataDeliveryDto)
    // }

    getQueueData_Delivery(): Promise<Queue[]> {
        return this.queueRepository.getQueueData_Delivery()
    }

    getQueue(id: string): Promise<Queue> {
        return this.queueRepository.getQueue(id)
    }

    deleteQueue(id: string) {
        return this.queueRepository.deleteQueue(id)
    }
}
