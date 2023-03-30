import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTvShowDto } from './tv-show.dto';
import { TvShowService } from './tv-show.service';

@Controller('tv-shows')
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

    @Put(':id')
    updateTVShow(@Param('id') id: number, @Body() createTVShowDto: CreateTvShowDto) {
        return this.tvShowService.updateTvShow(id, createTVShowDto);
    }

    @Get('/genre/:id')
    getTVShowsByGenre(@Param('id') id: number) {
        return this.tvShowService.findTVShowsByGenre(id);
    }

    @Get('/search/:name?/:country?')
    search(@Param('name') name: string, @Param('country') country?: string) {
        return this.tvShowService.search(name, country);
    }
}
