import { IsNotEmpty, IsString } from "class-validator";

export class EditCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
