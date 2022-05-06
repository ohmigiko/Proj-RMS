import { IsNotEmpty, IsString } from "class-validator";

export class EditTableDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
