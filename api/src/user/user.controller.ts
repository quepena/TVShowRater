import { Controller, Get, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.findAllUsers();
    }

    @Get('/:id')
    getUserById(id: number) {
        return this.userService.findUserById(id)
    }
}
