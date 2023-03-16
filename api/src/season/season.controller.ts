import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeasonDto } from './season.dto';
import { SeasonService } from './season.service';

@Controller('seasons')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Get()
    findSeasons() {
        return this.seasonService.findSeasons();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSeason(@Body() createSeasonDto: CreateSeasonDto) {
        return this.seasonService.createSeason(createSeasonDto);
    }

    @Get(':id')
    getSeasonById(@Param('id') id: number) {
        return this.seasonService.findSeasonById(id);
    }

    @Delete(':id')
    deleteSeason(@Param('id', ParseIntPipe) id: number) {
        return this.seasonService.deleteSeason(id);
    }

    @Put(':id')
    async updateSeason(@Param('id') id: number, @Body() season: CreateSeasonDto) {
        return this.seasonService.updateSeason(id, season);
    }

    @Get('/tvshow/:id')
    getSeasonsByTVShow(@Param('id') id: number) {
        return this.seasonService.findSeasonsByTVShows(id);
    }
}
