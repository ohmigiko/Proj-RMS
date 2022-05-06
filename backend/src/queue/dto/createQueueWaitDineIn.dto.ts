import { IsNotEmpty, IsString } from "class-validator";

export class CreateQueueWaitDineInDto {
    @IsNotEmpty()
    @IsString()
    queue_group: string

    @IsNotEmpty()
    num_of_customer: number
}
