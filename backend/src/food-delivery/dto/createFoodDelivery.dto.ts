import { IsNotEmpty, IsString } from "class-validator";

export class CreateFoodDeliveryDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    color: string
}