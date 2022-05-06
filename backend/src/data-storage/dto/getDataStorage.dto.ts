import { IsNotEmpty, IsString } from "class-validator";

export class GetDataStorageDto {
    @IsNotEmpty()
    @IsString()
    name: string
}
