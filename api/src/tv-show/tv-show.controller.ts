import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTvShowDto } from './tv-show.dto';
import { TvShowService } from './tv-show.service';

@Controller('tv-show')
export class TvShowController {
    constructor(private readonly tvShowService: TvShowService) { }

    @Get()
    findTvShow() {
        return this.tvShowService.findTvShows();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTvShow(@Body() createTvShowDto: CreateTvShowDto) {
        return this.tvShowService.createTvShow(createTvShowDto);
    }

    @Delete(':id')
    deleteTVShow(@Param('id', ParseIntPipe) id: number) {
        return this.tvShowService.deleteTVShow(id);
    }

    @Get(':id')
    getTVShowById(@Param('id') id: number) {
        return this.tvShowService.findTVShowById(id);
    }
}
