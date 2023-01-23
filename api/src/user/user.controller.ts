import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: number) {
        return this.userService.findUserById(id)
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }

    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() user: CreateUserDto) {
        return this.userService.updateUser(id, user);
    }
}
