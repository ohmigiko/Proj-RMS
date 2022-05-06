import { IsNotEmpty, IsString } from "class-validator";

export class CreateQueueDto {
    @IsNotEmpty()
    @IsString()
    queue_group: string

    @IsNotEmpty()
    @IsString()
    order_method: string

}

