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
}
