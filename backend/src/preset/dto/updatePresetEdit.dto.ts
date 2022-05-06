import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class UpdatePresetEditDto {

    @IsNotEmpty()
    @IsBoolean()
    topping: object[]

}
