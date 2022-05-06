import { IsNotEmpty, IsString } from "class-validator";
import { Order } from "src/order/order.entity";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString()
    method: string

}
