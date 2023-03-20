import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Delete, Put, Param, ParseIntPipe } from '@nestjs/common';
import { CreateReviewDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Get()
    findReview() {
        return this.reviewService.findReview();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createReview(@Body() createReviewDto: CreateReviewDto) {
        return this.reviewService.createReview(createReviewDto);
    }

    @Get(':id')
    getReviewById(@Param('id') id: number) {
        return this.reviewService.findReviewById(id);
    }

    @Delete(':id')
    deleteReview(@Param('id', ParseIntPipe) id: number) {
        return this.reviewService.deleteReview(id);
    }

    @Put(':id')
    async updateReview(@Param('id') id: number, @Body() review: CreateReviewDto) {
        return this.reviewService.updateReview(id, review);
    }

    @Get('/user/:id')
    getReviewsByUser(@Param('id') id: number) {
        return this.reviewService.findReviewsByUser(id);
    }

    @Get('/tv-show/:id')
    getReviewsByTvShow(@Param('id') id: number) {
        return this.reviewService.findReviewsByTvShow(id);
    }

    @Get('/tv-show/:id/count')
    getNumReviewsByTvShow(@Param('id') id: number) {
        return this.reviewService.findNumReviewsByTvShow(id);
    }
}
