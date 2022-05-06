import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { Order } from "../order.entity";


export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    queue_id: string

    @IsNotEmpty()
    @IsString()
    order_list: Order[]

    @IsNotEmpty()
    @IsBoolean()
    urgent: boolean


    @IsNotEmpty()
    @IsBoolean()
    take_home: boolean

}
