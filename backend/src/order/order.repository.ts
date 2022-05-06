import console from "console";
import { queue } from "rxjs";
import { Menu } from "src/menu/menu.entity";
import { MenuService } from "src/menu/menu.service";
import { User } from "src/user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/createOrder.dto";
import { GetOrderDto } from "./dto/getOrder.dto";
import { UpdateOrderEditDto } from "./dto/updateOrderEdit.dto";
import { UpdateOrderStatusDto } from "./dto/updateOrderStatus.dto";
import { Order } from "./order.entity";
import time_taken, { equal } from "./time_taken";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    async updateOrderStatus(updateOrderStatusDto: UpdateOrderStatusDto, id: string, user: User, time: number): Promise<Order> {
        const order = await this.findOne(id)
        const { status } = updateOrderStatusDto
        let now = new Date
        order.status = status
        order.date_last_edit = new Date
        order.cook_by = user.name
        if (status == "done") {
            order.date_done = now
            order.time_taken_min = time
        }
        await this.update(id, order)
        return order
    }

    async updateOrderEdit(updateOrderEditDto: UpdateOrderEditDto, id: string): Promise<Order> {
        const order = await this.findOne(id)
        const { topping, quantity } = updateOrderEditDto
        order.topping = topping
        order.quantity = quantity
        order.date_last_edit = new Date
        await this.update(id, order)
        return order
    }

    async deleteOrder(id: string) {
        await this.delete(id)
    }

    async getOrder(id: string) {
        const waiting_urgent = await this.find({
            where: { category_id: id, status: 'waiting', urgent: true },
            relations: ['queue', 'menu'],
            order: { date_create: "ASC" },
        })
        const cooking_urgent = await this.find({
            where: { category_id: id, status: 'cooking', urgent: true },
            relations: ['queue', 'menu'],
            order: { date_create: "ASC" },
        })
        const waiting_normal = await this.find({
            where: { category_id: id, status: 'waiting', urgent: false },
            relations: ['queue', 'menu'],
            order: { date_create: "ASC" },
        })
        const cooking_normal = await this.find({
            where: { category_id: id, status: 'cooking', urgent: false },
            relations: ['queue', 'menu'],
            order: { date_create: "ASC" },
        })
        const orders = cooking_urgent.concat(waiting_urgent).concat(cooking_normal).concat(waiting_normal)
        return orders
    }

    async getOrderByQueue(id: string) {
        return await this.find({ where: { queue_id: id }, relations: ['menu'] })
    }

    // async createOrder(createOrderDto: CreateOrderDto, user: User, menulist): Promise<Order[]> {
    //     const { queue_id, urgent, order_list, take_home } = createOrderDto
    //     const now = new Date
    //     let list: Order[] = []
    // let old_order = await this.getOrderByQueue(queue_id)
    // for (let i = 0; i < order_list.length; i++) {
    //     let stack = false
    //     let temp_order = order_list[i]
    //     for (let j = 0; j < old_order.length; j++) {
    //         let temp_old_order = old_order[j]
    //         if (temp_order.menu_id == temp_old_order.menu_id && equal(temp_old_order.topping, temp_order.topping) && temp_old_order.status == 'waiting') {
    //             temp_old_order.quantity += temp_order.quantity
    //             temp_order.date_last_edit = now
    //             this.update(temp_old_order.id, temp_old_order)
    //             stack = true
    //         }
    //     }
    //     if (!stack) {
    //         if (order_list[i].quantity != 0) {
    //             let topping_price = 0
    //             for (let j = 0; j < order_list[i].topping.length; j++) {
    //                 topping_price += order_list[i].topping[j]['choice']['price']
    //             }
    //             let new_order = this.create({
    //                 category_id: order_list[i].category_id,
    //                 topping: order_list[i].topping,
    //                 queue_id,
    //                 menu_id: order_list[i].menu_id,
    //                 status: 'waiting',
    //                 urgent: urgent,
    //                 take_home: take_home,
    //                 date_create: now,
    //                 date_last_edit: now,
    //                 create_by: user.name,
    //                 quantity: order_list[i].quantity,
    //                 estimated_time_min: menulist[i].average_time_min,
    //                 price: menulist[i].price + topping_price
    //             })
    //             await this.save(new_order)
    //             list.push(new_order)
    //         }

    //     }
    // }


    //     for (let i = 0; i < order_list.length; i++) {
    //         let topping_price = 0
    //         for (let j = 0; j < order_list[i].topping.length; j++) {
    //             topping_price += order_list[i].topping[j]['price']
    //         }
    //         let new_order = this.create({
    //             category_id: order_list[i].category_id,
    //             topping: order_list[i].topping,
    //             queue_id,
    //             menu_id: order_list[i].menu_id,
    //             status: 'waiting',
    //             urgent: urgent,
    //             take_home: take_home,
    //             date_create: now,
    //             date_last_edit: now,
    //             create_by: user.name,
    //             quantity: order_list[i].quantity,
    //             estimated_time_min: menulist[i].average_time_min,
    //             price: menulist[i].price + topping_price
    //         })
    //         await this.save(new_order)
    //         list.push(new_order)
    //     }
    //     return list
    // }

    async getOrderById(id: string) {
        return this.findOne({ where: { id: id } })
    }

    async getOrderDone(id: string) {
        const orders = await this.find({ where: { status: 'done', category_id: id }, relations: ['queue', 'menu'] })
        return orders.reverse().slice(0, 5)
    }

    async deleteOrderByQueue(id: string) {
        const list = await this.find({ where: { queue_id: id } })
        for (let i = 0; i < list.length; i++) {
            await this.delete(list[i].id)
        }
    }
}
