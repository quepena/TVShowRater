import fetch from 'cross-fetch';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateGenreDto } from './genre.dto';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Get()
    getGenres() {
        return this.genreService.findAllGenres();
    }

    @Get(':id')
    getGenreById(@Param('id') id: number) {
        return this.genreService.findGenreById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.createGenre(createGenreDto);
    }

    @Delete(':id')
    deleteGenre(@Param('id', ParseIntPipe) id: number) {
        return this.genreService.deleteGenre(id);
    }

    @Put(':id')
    async updateGenre(@Param('id') id: number, @Body() genre: CreateGenreDto) {
        return this.genreService.updateGenre(id, genre);
    }

    @Get('faker/genre')
    async fakeGenres() {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/tv/list?language=en',
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_AUTH
            }
        };

        const res = await fetch(options.url, options)
        const allGenre = await res.json();
        for (let i = 0; i < allGenre.genres.length; i++) {
            this.genreService.createGenre({ name: allGenre.genres[i].name })
        }

        return 0;
    }
}
