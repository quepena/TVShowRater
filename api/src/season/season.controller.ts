import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeasonDto } from './season.dto';
import { SeasonService } from './season.service';

@Controller('season')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Get()
    findSeason() {
        return this.seasonService.findSeason();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createSeason(@Body() createSeasonDto: CreateSeasonDto) {
        return this.seasonService.createSeason(createSeasonDto);
    }
}
