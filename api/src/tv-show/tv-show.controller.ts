import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common';
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
        const rounds = 15;
        // function getRandomInt(min, max) {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);
        //     return Math.floor(Math.random() * (max - min) + min);
        // }

        for (let index = 1; index <= rounds; index++) {
            // for (let index = 0; index < rounds; index++) {
            const round = index;

            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${round}?language=en-US`,
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_AUTH
                }
            };

            const res = await fetch(options.url, options)
            const allGenre = await res.json();
            // console.log(allGenre);

            // const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
            // console.log(allGenre.tvShow.start_date)

            const genreList = []
            for (const element of allGenre.genres){
                const genre = await this.genreService.findGenreByName(element.name)
                
                genreList.push(genre.id);
            }
            
            // allGenre.genres.forEach(async element => {
            //     const genre = await this.genreService.findGenreByName(element.name)
            //     const genreAsync = genre;
                
            //     genreList.push(genreAsync);
            // });

            const youtube = await fetch(`https://api.themoviedb.org/3/tv/${round}/videos?language=en-US`, options)
            const youtubeRes = await youtube.json()
            
            const addId = await fetch(`https://api.themoviedb.org/3/tv/${round}/external_ids`, options)
            const addIdRes = await addId.json()
            // console.log(addIdRes.imdb_id);
            
            
            
            // const genre = this.genreService.findGenreByName()

            this.tvShowService.createTvShow({ name: allGenre.name, genres: genreList, description: allGenre.overview, country: allGenre.origin_country, photo: `https://image.tmdb.org/t/p/w500/${allGenre.poster_path}`, length: allGenre.episode_run_time[0], trailer: `https://www.youtube.com/watch?v=${youtubeRes.results[0]?.key}`, year: allGenre.first_air_date, addId: addIdRes.imdb_id })
        }

        return 0;
    }
}
