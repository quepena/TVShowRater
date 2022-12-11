import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTvShowDto } from './tv-show.dto';
import { TvShowService } from './tv-show.service';

@Controller('tv-show')
export class TvShowController {
    constructor(private readonly tvShowService: TvShowService) { }

    @Get()
    findTvShow() {
        return this.tvShowService.findTvShows();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createTvShow(@Body() createTvShowDto: CreateTvShowDto) {
        return this.tvShowService.createTvShow(createTvShowDto);
    }
}
