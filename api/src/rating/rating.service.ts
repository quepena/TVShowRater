import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './rating.dto';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
    ) { }

    async createRating(ratingDetails: CreateRatingDto): Promise<Rating> {
        const { user, tvShow, rating } = ratingDetails;
        const newRating = new Rating();
        newRating.user = await this.userRepository.findOne({ where: { id: user } })
        newRating.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newRating.rating = rating;

        return await this.ratingRepository.save(newRating);
    }

    async findRating() {
        return await this.ratingRepository.find({
            relations: {
                user: true,
                tvShow: true,
            }
        });
    }

    async findRatingById(id: number) {
        return await this.ratingRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async deleteRating(id: number) {
        return await this.ratingRepository.delete(id);
    }

    async updateRating(id: number, ratingDetails: CreateRatingDto): Promise<Rating> {
        const { user, tvShow, rating } = ratingDetails;
        const newRating = new Rating();
        newRating.user = await this.userRepository.findOne({ where: { id: user } })
        newRating.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newRating.rating = rating

        const saveNewRating = await this.ratingRepository.save(
            { id: Number(id), user: newRating.user, tvShow: newRating.tvShow, rating: newRating.rating }
        )

        return saveNewRating
    }

    async findRatingsByUser(id: number) {
        return await this.ratingRepository.find({
            where: { user: { id: id } },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async findRatingOfShowByUser(user: number, show: number) {
        return await this.ratingRepository.find({
            where: { user: { id: user }, tvShow: { id: show } },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async findRatingsByTvShow(id: number) {
        return await this.ratingRepository.find({
            where: { tvShow: { id: id } },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }
    
    async findMeanRatingForTvShow(id: number) {
        const ratings = await this.ratingRepository.findAndCount({ where: { tvShow: { id: id } } })
        
        let rate = 0
        for(let i = 0; i < ratings[1]; i++) {
            rate += ratings[0][i].rating;
        }

        const mean = rate / ratings[1]

        if(mean) return mean
        else return "0.0"
    }
}
