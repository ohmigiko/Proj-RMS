import { IsNotEmpty, IsString } from "class-validator";

export class GetPresetDto {
    @IsNotEmpty()
    @IsString()
    category_id: string

}
