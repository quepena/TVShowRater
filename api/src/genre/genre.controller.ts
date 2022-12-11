import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateGenreDto } from './genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
    constructor(private readonly genreService: GenreService) { }

    @Get()
    findGenres() {
        return this.genreService.findGenres();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.createGenre(createGenreDto);
    }
}
