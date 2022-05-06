import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { MenuService } from 'src/menu/menu.service';
import { QueueService } from 'src/queue/queue.service';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from './dto/createOrder.dto';
import { GetOrderDto } from './dto/getOrder.dto';
import { UpdateOrderEditDto } from './dto/updateOrderEdit.dto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';
import time_taken, { equal } from './time_taken';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderRepository)
        public orderRepository: OrderRepository,
        private menuService: MenuService,
        private queueService: QueueService
    ) { }

    // async createOrder(@Body() createOrderDto: CreateOrderDto, user: User): Promise<Order[]> {
    //     const { order_list } = createOrderDto
    //     let menulist = []
    //     for (let i = 0; i < order_list.length; i++) {
    //         let menu = await this.menuService.menuRepository.findOne(order_list[i].menu_id)
    //         menulist.push(menu)
    //     }
    //     // console.log("user: ", user, " Dto: ", createOrderDto, " menulist:", menulist)
    //     return this.orderRepository.createOrder(createOrderDto, user, menulist)
    // }

    async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order[]> {
        const { queue_id, urgent, order_list, take_home } = createOrderDto
        const queue = await this.queueService.queueRepository.findOne({ where: { id: queue_id } })
        queue.is_ordered = true
        await this.queueService.queueRepository.update(queue_id, queue)
        let menulist = []
        for (let i = 0; i < order_list.length; i++) {
            let menu = await this.menuService.menuRepository.findOne(order_list[i].menu_id)
            menulist.push(menu)
        }
        const now = new Date
        let list: Order[] = []
        let old_order = await this.getOrderByQueue(queue_id)
        console.log(old_order)
        for (let i = 0; i < order_list.length; i++) {

            if (order_list[i].quantity != 0) {
                let topping_price = 0
                for (let j = 0; j < order_list[i].topping.length; j++) {
                    topping_price += Number(order_list[i].topping[j]['choice']['price'])
                    console.log("top_price", order_list[i].topping[j]['choice']['price'])
                }
                console.log("topping", topping_price)
                console.log("menu", menulist[i].price)
                let new_order = this.orderRepository.create({
                    category_id: order_list[i].category_id,
                    menu_name: menulist[i].name,
                    topping: order_list[i].topping,
                    queue_id,
                    menu_id: order_list[i].menu_id,
                    status: 'waiting',
                    urgent: urgent,
                    take_home: take_home,
                    date_create: now,
                    date_last_edit: now,
                    create_by: user.name,
                    quantity: order_list[i].quantity,
                    estimated_time_min: menulist[i].average_time_min,
                    price: Number(menulist[i].price) + Number(topping_price)
                })
                await this.orderRepository.save(new_order)
                list.push(new_order)
            }
        }
        return list
    }


    async updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto, id: string, user: User): Promise<Order> {
        console.log(id)
        const order = await this.orderRepository.findOne(id)
        // const order = await this.orderRepository.find({ where: { id: id } })[0];
        let now = new Date
        let time = (now.getTime() - order.date_last_edit.getTime()) / 60000
        this.menuService.menurecord(Math.round(time), order.menu_id)
        // console.log(now.getTime())
        // console.log(order.date_create.getTime())
        console.log("done_at : ", now.getHours(), ":", now.getMinutes())
        console.log("create_at : ", order.date_create.getHours(), ":", order.date_create.getMinutes())
        console.log(Math.round(time))
        return this.orderRepository.updateOrderStatus(updateOrderStatusDto, id, user, Math.round(time))
    }

    // async updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto, id: string, user: User): Promise<Order> {
    //     const order = await this.orderRepository.findOne(id)
    //     const { status } = updateOrderStatusDto
    //     let nowdate = new Date
    //     let time = time_taken(order.date_create, nowdate)
    //     order.status = status
    //     order.date_last_edit = new Date
    //     order.cook_by = user.name
    //     if (status == "done") {
    //         order.date_done = nowdate
    //         order.time_taken_min = time
    //     }
    //     this.menuService.menurecord(time, order.id)
    //     await this.orderRepository.update(id, order)
    //     return order
    // }

    updateOrderEdit(updateOrderEditDto: UpdateOrderEditDto, id: string): Promise<Order> {
        return this.orderRepository.updateOrderEdit(updateOrderEditDto, id)
    }

    deleteOrder(id: string) {
        return this.orderRepository.deleteOrder(id)
    }

    deleteOrderByQueue(id: string) {
        return this.orderRepository.deleteOrderByQueue(id)
    }

    getOrder(id: string) {
        return this.orderRepository.getOrder(id)
    }

    getOrderDone(id: string) {
        return this.orderRepository.getOrderDone(id)
    }

    async getOrderByQueue(id: string) {
        return this.orderRepository.getOrderByQueue(id)
    }

    getOrderById(id: string) {
        return this.orderRepository.getOrderById(id)
    }
}
