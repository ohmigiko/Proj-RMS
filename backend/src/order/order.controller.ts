import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderEditDto } from './dto/updateOrderEdit.dto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { GetOrderDto } from './dto/getOrder.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/user/user.entity';
import { equal } from './time_taken';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto, @GetUser() user: User): Promise<Order[]> {
        console.log(createOrderDto)
        return this.orderService.createOrder(createOrderDto, user)
    }

    @Patch('/status/:id')
    updateOrderStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @GetUser() user: User): Promise<Order> {
        return this.orderService.updateOrderStatus(updateOrderStatusDto, id, user)
    }

    @Patch('/edit/:id')
    updateOrderEdit(@Param('id') id: string, @Body() updateOrderEditDto: UpdateOrderEditDto): Promise<Order> {
        return this.orderService.updateOrderEdit(updateOrderEditDto, id)
    }

    @Delete('/delete/:id')
    deleteOrder(@Param('id') id: string) {
        return this.orderService.deleteOrder(id)
    }

    @Delete('/delete-by-queue/:id')
    deleteOrderByQueue(@Param('id') id: string) {
        return this.orderService.deleteOrderByQueue(id)
    }

    @Get('/category/:id')
    getOrder(@Param('id') id: string) {
        return this.orderService.getOrder(id)
    }

    @Get('/done/:id')
    getOrderDone(@Param('id') id: string) {
        return this.orderService.getOrderDone(id)
    }

    @Get('/:id')
    getOrderById(@Param('id') id: string) {
        console.log("oder_id", id)
        return this.orderService.getOrderById(id)
    }

    @Get('/by_queue/:id')
    getOrderByQueue(@Param('id') id: string) {
        return this.orderService.getOrderByQueue(id)
    }

    // @Get('/test')
    // test() {
    //     return equal([
    //         {
    //             name: "น้ำแข็ง",
    //             choice: "yes",
    //             price: 1
    //         },
    //         {
    //             name: "เย็น",
    //             choice: "no",
    //             price: 1
    //         }
    //     ], [
    //         {
    //             "name": "น้ำแข็ง",
    //             "price": 1,
    //             "choice": "yes"
    //         },
    //         {
    //             "name": "เย็น",
    //             "price": 1,
    //             "choice": "no"
    //         }
    //     ])
    // }
}
