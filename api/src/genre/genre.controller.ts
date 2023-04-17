import { faker } from '@faker-js/faker';
import fetch from 'cross-fetch';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
// import { fakeGenre } from './faker';
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
        const rounds = 10;
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
            console.log(allGenre.tvShow.genres)
            console.log(allGenre.tvShow.genres.length)
            for (let i = 0; i < allGenre.tvShow.genres.length; i++) {
                const genre = await this.genreService.findGenreByName(allGenre.tvShow.genres[i]);
                console.log(!genre)
                if (!genre) this.genreService.createGenre({ name: allGenre.tvShow.genres[i] })
                else continue
            }
        }

        return 0;
    }
}
