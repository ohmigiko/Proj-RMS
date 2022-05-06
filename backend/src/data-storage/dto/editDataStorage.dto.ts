import { IsNotEmpty, IsString } from "class-validator";

export class EditDataStorageDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    data: string
}
