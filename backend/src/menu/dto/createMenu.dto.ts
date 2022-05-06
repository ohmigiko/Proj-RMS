import { IsNotEmpty, IsString } from "class-validator";
import { topping } from "src/order/order.entity";
import { top } from "../menu.entity";

export class CreateMenuDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    topping: top[]

    @IsNotEmpty()
    @IsString()
    category_id: string

    @IsNotEmpty()
    price: number

}
