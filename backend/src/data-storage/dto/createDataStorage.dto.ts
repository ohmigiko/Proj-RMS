import { IsNotEmpty, IsString } from "class-validator";

export class CreateDataStorageDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    data: string
}
