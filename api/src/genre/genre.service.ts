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

  async findAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find({ order: { name: 'ASC' } });
  }

  async findGenreById(id: number) {
    return this.genreRepository.findOneBy({ id: id })
  }

  async findGenreByName(name: string) {
    return await this.genreRepository.findOneBy({ name: name })
  }

  async createGenre(createGenreDto: CreateGenreDto) {
    const newGenre = this.genreRepository.create(createGenreDto);
    return await this.genreRepository.save(newGenre);
  }

  async deleteGenre(id: number) {
    return await this.genreRepository.delete(id);
  }

  async updateGenre(id: number, createGenreDto: CreateGenreDto) {
    await this.genreRepository.update(id, createGenreDto);
    const updatedGenre = await this.genreRepository.findOneBy({ id: id });
    if (updatedGenre) {
      return updatedGenre;
    }
  }
}
