import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    getRoles() {
        return this.roleService.findAllRoles();
    }

    @Get(':id')
    getRoleById(@Param('id') id: number) {
        return this.roleService.findRoleById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }

    @Delete(':id')
    deleteRole(@Param('id', ParseIntPipe) id: number) {
        return this.roleService.deleteRole(id);
    }

    @Put(':id')
    async updateRole(@Param('id') id: number, @Body() role: CreateRoleDto) {
        return this.roleService.updateRole(id, role);
    }
}
