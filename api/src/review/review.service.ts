import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User, TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private readonly reviewRepository: Repository<Review>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
    ) { }

    async createReview(reviewDetails: CreateReviewDto): Promise<Review> {
        const { user, tvShow, review } = reviewDetails;
        const newReview = new Review();
        newReview.user = await this.userRepository.findOne({ where: { id: user } })
        newReview.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newReview.review = review;

        return await this.reviewRepository.save(newReview);
    }

    async findReview() {
        return await this.reviewRepository.find({
            relations: {
                user: true,
                tvShow: true,
            }
        });
    }

    async findReviewById(id: number) {
        return await this.reviewRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async deleteReview(id: number) {
        return await this.reviewRepository.delete(id);
    }

    async updateReview(id: number, reviewDetails: CreateReviewDto): Promise<Review> {
        const { user, tvShow, review } = reviewDetails;
        const newReview = new Review();
        newReview.user = await this.userRepository.findOne({ where: { id: user } })
        newReview.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newReview.review = review

        const saveNewReview = await this.reviewRepository.save(
            { id: Number(id), user: newReview.user, tvShow: newReview.tvShow, review: newReview.review }
        )

        return saveNewReview
    }

    async findReviewsByUser(id: number) {
        return await this.reviewRepository.find({
            where: { user: { id: id } },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async findReviewsByTvShow(id: number) {
        return await this.reviewRepository.find({
            where: { tvShow: { id: id } },
            relations: {
                user: true,
                tvShow: true,
            }
        })
    }

    async findNumReviewsByTvShow(id: number) {
        return await this.reviewRepository.count({
            where: { tvShow: { id: id } }
        })
    }
}
