import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './genre.dto';
import { GenreService } from './genre.service';

// const name = faker.music.genre();

// @Injectable()
// export class fakeGenre {
//     constructor(private readonly genreService: GenreService) { }

//     createGenre(createGenreDto: CreateGenreDto) {
//         createGenreDto = {
//             name: name
//         }
//         return this.genreService.createGenre(createGenreDto)
//     }
// }

export const fakeGenre = () => ({
    name: faker.music.genre()
})

