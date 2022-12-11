import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    findRoles() {
        return this.roleService.findRoles();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }
}
