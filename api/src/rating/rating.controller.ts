import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateRatingDto } from './rating.dto';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Get()
    findRating() {
        return this.ratingService.findRating();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRating(@Body() createRatingDto: CreateRatingDto) {
        return this.ratingService.createRating(createRatingDto);
    }

    @Get(':id')
    getRatingById(@Param('id') id: number) {
        return this.ratingService.findRatingById(id);
    }

    @Delete(':id')
    deleteRating(@Param('id', ParseIntPipe) id: number) {
        return this.ratingService.deleteRating(id);
    }

    @Put(':id')
    async updateRating(@Param('id') id: number, @Body() rating: CreateRatingDto) {
        return this.ratingService.updateRating(id, rating);
    }

    @Get('/user/:id')
    getRatingsByUser(@Param('id') id: number) {
        return this.ratingService.findRatingsByUser(id);
    }

    @Get('/user/:user/show/:show')
    getRatingOfShowByUser(@Param('user') user: number, @Param('show') show: number) {
        return this.ratingService.findRatingOfShowByUser(user, show);
    }

    @Get('/tv-show/:id')
    getRatingsByTvShow(@Param('id') id: number) {
        return this.ratingService.findRatingsByTvShow(id);
    }

    @Get('/tv-show/:id/rate')
    getMeanRatingForTvShow(@Param('id') id: number) {
        return this.ratingService.findMeanRatingForTvShow(id);
    }
}
