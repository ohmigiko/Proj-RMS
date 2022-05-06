import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { User, UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }


    @Post('/init')
    init() {
        return this.userService.init();
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Admin)
    @Post('/admin')
    check_admin() {
        console.log('this is admin')
    }


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Waiter)
    @Post('/waiter')
    check_waiter() {
        console.log('this is waiter')
    }


    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.Chef)
    @Post('/chef')
    check_chef() {
        console.log('this is chef')
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }

    @Patch('/undelete/:id')
    undeleteUser(@Param('id') id: string) {
        return this.userService.undeleteUser(id)
    }

    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUser(id)
    }

    @Patch('/:id')
    editUser(@Param('id') id: string, editUserDto: EditUserDto): Promise<User> {
        return this.userService.editUser(id, editUserDto)
    }
}
