import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/role.enum";

export class EditUserDto {
    @IsNotEmpty()
    role: Role

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    id: string
}