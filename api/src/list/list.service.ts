import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateListDto } from './list.dto';
import { List } from './list.entity';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(List) private readonly listRepository: Repository<List>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
    ) { }

    async createList(listDetails: CreateListDto): Promise<List> {
        const { name, tvShows, user } = listDetails;
        const list = new List();
        list.name = name;
        list.user = await this.userRepository.findOne({ where: { id: user } })
        list.tvShows = [];
        for (let i = 0; i < tvShows.length; i++) {
            const tvShow = await this.tvShowRepository.findOne({
                where: { id: tvShows[i] }
            });
            list.tvShows.push(tvShow);  
        }

        return await this.listRepository.save(list);
    }

    async findLists() {
        return await this.listRepository.find({
            relations: {
                user: true,
                tvShows: true,
            }
        });
    }

    async findListById(id: number) {
        return await this.listRepository.findOneBy({ id: id })
    }

    async deleteList(id: number) {
        return await this.listRepository.delete(id);
    }

    async updateList(id: number, listDetails: CreateListDto): Promise<List> {
        const { name, tvShows, user } = listDetails;
        const list = new List();
        list.name = name;
        list.user = await this.userRepository.findOne({ where: { id: user } })
        list.tvShows = [];
        for (let i = 0; i < tvShows.length; i++) {
            const tvShow = await this.tvShowRepository.findOne({
                where: { id: tvShows[i] }
            });
            list.tvShows.push(tvShow);
        }

        const newList = await this.listRepository.save(
            { id: Number(id), name: list.name, tvShows: list.tvShows, user: list.user }
        )

        return newList
    }

    async findListsByUser(id: number) {
        return await this.listRepository.find({ where: { user: { id: id } } })
    }
}
