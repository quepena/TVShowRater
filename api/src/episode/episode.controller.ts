import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
}
