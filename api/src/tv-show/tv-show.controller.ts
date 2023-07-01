import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTvShowDto } from './tv-show.dto';
import { TvShowService } from './tv-show.service';
import fetch from 'cross-fetch';
import { GenreService } from 'src/genre/genre.service';

@Controller('tv-shows')
export class TvShowController {
    constructor(
        private readonly tvShowService: TvShowService,
        private readonly genreService: GenreService,
    ) { }

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

    @Get('search/query?')
    search(
        @Query('name') name: string
    ) {
        return this.tvShowService.search(name);
    }

    @Get('search-shows/query?')
    searchShows(
        @Query('name') name: string
    ) {
        return this.tvShowService.searchShows(name);
    }

    @Get('faker/shows')
    async fakeShows() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=3`,
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_AUTH
            }
        };

        const res = await fetch(options.url, options)
        const allGenre = await res.json();
        const genreList = []
        if (allGenre.results.genre_ids) {
            for (const element of allGenre.genres) {
                const genre = await this.genreService.findGenreByName(element.name)

                genreList.push(genre.id);
            }
        }

        for (let index = 0; index <= allGenre.results.length; index++) {
            const youtube = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/videos?language=en-US`, options)
            const youtubeRes = await youtube.json()

            const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
            const addIdRes = await addId.json()

            const allGenre2 = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}?language=en-US`, options)
            const allGenre2Res = await allGenre2.json()

            const lenghtNew = allGenre2Res.status_code == "34" ? null : allGenre2Res.episode_run_time[0]

            if (allGenre2Res.status_code != "34")
                this.tvShowService.createTvShow({ name: allGenre2Res.name, genres: genreList, description: allGenre2Res.overview, country: allGenre2Res.origin_country, photo: `https://image.tmdb.org/t/p/w500/${allGenre2Res.poster_path}`, length: lenghtNew, trailer: `https://www.youtube.com/watch?v=${youtubeRes.status_code == "34" ? null : youtubeRes.results[0]?.key}`, year: allGenre2Res.first_air_date, addId: addIdRes.imdb_id })
        }
    }
}
