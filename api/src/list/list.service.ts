import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { range } from 'rxjs';
import { User, TvShow, Genre } from 'src/entities';
import { In, IsNull, Repository } from 'typeorm';
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
        if (user) list.user = await this.userRepository.findOne({ where: { id: user } })
        else list.user = null
        list.tvShows = [];
        for (let i = 0; i < tvShows.length; i++) {
            console.log(tvShows[i]);

            const tvShow = await this.tvShowRepository.findOne({
                where: { id: tvShows[i] }
            });
            tvShow ? list.tvShows.push(tvShow) : list.tvShows.push(null)
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
        return await this.listRepository.findOne({ where: { id: id }, relations: { user: true, tvShows: true } })
    }

    async findAdminListByName(name: string): Promise<TvShow[]> {
        const list = this.listRepository
            .findOne({
                where:
                {
                    user: IsNull(),
                    name: name,
                },
                relations: ['tvShows', 'user'],
            })

        let arr = [];
        (await list).tvShows.forEach((tvShow) => arr.push(tvShow.id))

        const tv = this.tvShowRepository
            .createQueryBuilder()
            .select()
            .orderBy("RANDOM()")
            .take(6)
            .skip(0)
            .where({ id: In([...arr]) })
            .getMany()

        const showsWGenres = [];
        (await tv).forEach((TvShow) => {
            showsWGenres.push(TvShow.id)
            // console.log(show);

            // showsWGenres.push(show)
            // console.log(TvShow.id);

        })

        const showFunc = (el: number) => {
            const show = this.tvShowRepository
                .findOne({
                    where:
                    {
                        id: el,
                    },
                    relations: ['genres'],
                })
            return show

        }

        const showG = []
        showsWGenres.forEach(async (el) => {
            const g = showFunc(el)
            const gr = await g

            // console.log(el, gr);


            showG.push(gr)

            if (gr.id == showsWGenres[showsWGenres.length - 1]) return showG
        })

        // console.log(showG);




        // console.log(shows);


        // for i in range(tv.length) {
        //     const tvGenre = this.tvShowRepository.findOne({
        //         where: {
        //             id: tv.id
        //         }
        //     })
        // }

        return (await tv);
    }

    async deleteList(id: number) {
        return await this.listRepository.delete(id);
    }

    async updateList(id: number, listDetails: CreateListDto): Promise<List> {
        const { name, tvShows, user } = listDetails;
        const list = new List();
        list.name = name;
        if (user) list.user = await this.userRepository.findOne({ where: { id: user } })
        else list.user = null
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
        return await this.listRepository.find({
            where: { user: { id: id } }, relations: ['tvShows', 'user'],
            order: {
                name: 'ASC'
            }
        })
    }
}
