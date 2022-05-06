import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/auth/role.enum";

export class CreateUserDto {
    @IsNotEmpty()
    role: Role

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    id: string
}
