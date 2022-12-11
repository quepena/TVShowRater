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

    createCast(createCastDto: CreateCastDto) {
        const newCast = this.castRepository.create(createCastDto);
        return this.castRepository.save(newCast);
    }

    findCast() {
        return this.castRepository.find();
    }
}
