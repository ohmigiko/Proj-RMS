import { IsNotEmpty, IsString } from "class-validator";

export class GetOrderDto {
    @IsNotEmpty()
    @IsString()
    category_id: string

}
