import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEpisodeDto } from './episode.dto';
import { EpisodeService } from './episode.service';

@Controller('episodes')
export class EpisodeController {
    constructor(private readonly episodeService: EpisodeService) { }

    @Get()
    findEpisode() {
        return this.episodeService.findEpisode();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createEpisode(@Body() createEpisodeDto: CreateEpisodeDto) {
        return this.episodeService.createEpisode(createEpisodeDto);
    }

    @Get(':id')
    getEpisodeById(@Param('id') id: number) {
        return this.episodeService.findEpisodeById(id);
    }

    @Delete(':id')
    deleteEpisode(@Param('id', ParseIntPipe) id: number) {
        return this.episodeService.deleteEpisode(id);
    }

    @Put(':id')
    async updateEpisode(@Param('id') id: number, @Body() episode: CreateEpisodeDto) {
        return this.episodeService.updateEpisode(id, episode);
    }

    @Get('/season/:id')
    getEpisodesBySeasons(@Param('id') id: number) {
        return this.episodeService.findEpisodesBySeasons(id);
    }
}
