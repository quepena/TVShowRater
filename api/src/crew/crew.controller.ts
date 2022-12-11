import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
