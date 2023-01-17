import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCastDto } from './cast.dto';

@Injectable()
export class CastService {
    constructor(
        @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
    ) { }

    async createCast(createCastDto: CreateCastDto) {
        const newCast = this.castRepository.create(createCastDto);
        return await this.castRepository.save(newCast);
    }

    async findCast() {
        return await this.castRepository.find();
    }

    async findCastById(id: number) {
        return await this.castRepository.findOneBy({ id: id });
    }

    async updateCast(id: number, createCastDto: CreateCastDto) {
        await this.castRepository.update(id, createCastDto);
        const updatedCast = await this.castRepository.findOneBy({id: id});
        if (updatedCast) {
            return updatedCast;
        }
    }

    async deleteCast(id: number) {
        return await this.castRepository.delete(id);
    }
}
