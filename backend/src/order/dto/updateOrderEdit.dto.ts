import { IsNotEmpty, IsString } from "class-validator";
import { topping } from "../order.entity";

export class UpdateOrderEditDto {

    @IsNotEmpty()
    topping: topping[]

    @IsNotEmpty()
    @IsString()
    quantity: number;

}
