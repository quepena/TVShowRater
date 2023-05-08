import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTvShowDto } from './tv-show.dto';
import { TvShowService } from './tv-show.service';
import fetch from 'cross-fetch';

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

    // @Get('/search/:name?/:country?')
    @Get('search/name/')
    // search(@Param('name') name: string, @Param('country') country?: string) {
    // search(@Body() body: { name?: string, country?: string }) {
    //     return this.tvShowService.search(body?.name, body?.country);
    search(@Query('name') name: string, @Query('country') country: string, @Query('genre') genre: string[]) {
        return this.tvShowService.search(name, country);
    }

    @Get('faker/shows')
    async fakeShows() {
        const rounds = 300;
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        for (let index = 0; index < rounds; index++) {
            const res = await fetch("https://www.episodate.com/api/show-details?q=" + getRandomInt(1, 80000), {
                method: "GET"
            })
            const allGenre = await res.json();
            const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
            console.log(!show)
            if (!show) this.tvShowService.createTvShow({ name: allGenre.tvShow.name, genres: allGenre.tvShow.genres, description: allGenre.tvShow.description, country: allGenre.tvShow.country, photo: allGenre.tvShow.image_thumbnail_path, length: allGenre.tvShow.runtime, trailer: allGenre.tvShow.youtube_link } as CreateTvShowDto)
        }

        return 0;
    }
}
