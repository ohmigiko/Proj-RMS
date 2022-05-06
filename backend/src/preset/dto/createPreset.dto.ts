import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CreatePresetDto {

    @IsNotEmpty()
    @IsBoolean()
    category_id: string

    @IsNotEmpty()
    @IsBoolean()
    menu_id: string


    @IsNotEmpty()
    @IsBoolean()
    topping: object[]

}
