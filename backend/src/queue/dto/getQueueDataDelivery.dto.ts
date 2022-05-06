import { IsNotEmpty, IsString } from "class-validator";

export class GetQueueDataDeliveryDto {

    @IsNotEmpty()
    @IsString()
    delivery_by: string

}

