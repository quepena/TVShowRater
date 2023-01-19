import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCrewDto } from './crew.dto';
import { CrewService } from './crew.service';

@Controller('crew')
export class CrewController {
    constructor(private readonly crewService: CrewService) { }

    @Get()
    findCrew() {
        return this.crewService.findCrew();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCrew(@Body() createCrewDto: CreateCrewDto) {
        return this.crewService.createCrew(createCrewDto);
    }

    @Get(':id')
    getCrewById(@Param('id') id: number) {
        return this.crewService.findCrewById(id);
    }

    @Delete(':id')
    deleteCrew(@Param('id', ParseIntPipe) id: number) {
        return this.crewService.deleteCrew(id);
    }

    @Put(':id')
    async updateCrew(@Param('id') id: number, @Body() crew: CreateCrewDto) {
        return this.crewService.updateCrew(id, crew);
    }
}
