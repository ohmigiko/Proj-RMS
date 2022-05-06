import { IsNotEmpty, IsString } from "class-validator";

export class EditMenuDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    price: number
}
