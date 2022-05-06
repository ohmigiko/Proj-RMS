import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.entity';
import { CreateQueueDto } from './dto/createQueue.dto';
import { CreateQueueDeliveryDto } from './dto/createQueueDelivery.dto';
import { CreateQueueDineInDto } from './dto/createQueueDineIn.dto';
import { CreateQueueTakeOutDto } from './dto/createQueueTakeOut.dto';
import { CreateQueueWaitDineInDto } from './dto/createQueueWaitDineIn.dto';
import { GetQueueDataDeliveryDto } from './dto/getQueueDataDelivery.dto';
import { UpdateQueueAssignTableDto } from './dto/updateQueueAssignTable.dto';
import { Queue } from './queue.entity';
import { QueueService } from './queue.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('queue')
export class QueueController {
    constructor(private queueService: QueueService) { }

    @Post()
    createQueue(@Body() createQueueDto: CreateQueueDto, @GetUser() user: User): Promise<Queue> {
        return this.queueService.createQueue(createQueueDto, user)
    }

    @Post('/dine-in')
    createQueueDineIn(@Body() createQueueDineInDto: CreateQueueDineInDto, @GetUser() user: User): Promise<Queue> {
        return this.queueService.createQueueDineIn(createQueueDineInDto, user)
    }

    @Post('/wait-dine-in')
    createQueueWaitDineIn(@Body() createQueueWaitDineInDto: CreateQueueWaitDineInDto, @GetUser() user: User): Promise<Queue> {
        return this.queueService.createQueueWaitDineIn(createQueueWaitDineInDto, user)
    }

    @Post('/delivery')
    createQueueDelivery(@Body() createQueueDeliveryDto: CreateQueueDeliveryDto, @GetUser() user: User): Promise<Queue> {
        return this.queueService.createQueueDelivery(createQueueDeliveryDto, user)
    }

    @Patch('/assign-table/:id')
    updateQueueAssignTable(@Param('id') id: string, @Body() updateQueueAssignTableDto: UpdateQueueAssignTableDto): Promise<Queue> {
        return this.queueService.updateQueueAssignTable(updateQueueAssignTableDto, id)
    }

    @Patch('/status/:id')
    updateQueueStatus(@Param('id') id: string): Promise<Queue> {
        return this.queueService.updateQueueStatus(id)
    }

    @Delete('/:id')
    deleteQueue(@Param('id') id: string) {
        return this.queueService.deleteQueue(id)
    }

    @Post('/take-out')
    createQueueTakeOut(@Body() createQueueTakeOutDto: CreateQueueTakeOutDto, @GetUser() user: User): Promise<Queue> {
        return this.queueService.createQueueTakeOut(createQueueTakeOutDto, user)
    }

    @Patch('/reset-queue')
    resetQueue() {
        return this.queueService.resetQueue()
    }

    @Get('/queue-num')
    getQueueNum() {
        return this.queueService.getQueueNum()
    }

    @Get('/dine-in')
    getQueueData_Dine_in(): Promise<Queue[]> {
        return this.queueService.getQueueData_Dine_in()
    }

    @Get('/wait-dine-in')
    getQueueData_Wait_Dine_in(): Promise<Queue[]> {
        return this.queueService.getQueueData_Wait_Dine_in()
    }

    @Get('/take-out')
    getQueueData_Take_Out(): Promise<Queue[]> {
        return this.queueService.getQueueData_Take_Out()
    }

    // @Get('/delivery')
    // getQueueData_Delivery(getQueueDataDeliveryDto: GetQueueDataDeliveryDto): Promise<Queue[]> {
    //     return this.queueService.getQueueData_Delivery(getQueueDataDeliveryDto)
    // }

    @Get('/delivery')
    getQueueData_Delivery(): Promise<Queue[]> {
        return this.queueService.getQueueData_Delivery()
    }


    @Get('/:id')
    getQueue(@Param('id') id: string): Promise<Queue> {
        return this.queueService.getQueue(id)
    }

}



