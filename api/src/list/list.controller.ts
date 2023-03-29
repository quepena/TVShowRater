import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateListDto } from './list.dto';
import { ListService } from './list.service';

@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Get()
    findList() {
        return this.listService.findLists();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createList(@Body() createListDto: CreateListDto) {
        return this.listService.createList(createListDto);
    }

    @Get(':id')
    getListById(@Param('id') id: number) {
        return this.listService.findListById(id);
    }

    @Delete(':id')
    deleteList(@Param('id', ParseIntPipe) id: number) {
        return this.listService.deleteList(id);
    }

    @Put(':id')
    async updateList(@Param('id') id: number, @Body() list: CreateListDto) {
        return this.listService.updateList(id, list);
    }

    @Get('/user/:id')
    getListsByUser(@Param('id') id: number) {
        return this.listService.findListsByUser(id);
    }

    @Get('name/:name')
    getListsByName(@Param('name') name: string) {
        return this.listService.findAdminListByName(name);
    }
}
