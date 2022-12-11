import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './genre.dto';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
  ) { }

  createGenre(createGenreDto: CreateGenreDto) {
    const newGenre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(newGenre);
  }

  findGenres() {
    return this.genreRepository.find();
  }
}
