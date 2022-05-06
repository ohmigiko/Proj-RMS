import { IsNotEmpty, IsString } from "class-validator";
import { top } from "../menu.entity";

export class UpdateToppingDto {
    @IsNotEmpty()
    topping: top[]
}
