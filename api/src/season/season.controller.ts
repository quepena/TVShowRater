import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeasonDto } from './season.dto';
import { SeasonService } from './season.service';

@Controller('seasons')
export class SeasonController {
    constructor(private readonly seasonService: SeasonService) { }

    @Get()
    findSeasons() {
        return this.seasonService.findSeasons();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSeason(@Body() createSeasonDto: CreateSeasonDto) {
        return this.seasonService.createSeason(createSeasonDto);
    }

    @Get(':id')
    getSeasonById(@Param('id') id: number) {
        return this.seasonService.findSeasonById(id);
    }

    @Delete(':id')
    deleteSeason(@Param('id', ParseIntPipe) id: number) {
        return this.seasonService.deleteSeason(id);
    }

    @Put(':id')
    async updateSeason(@Param('id') id: number, @Body() season: CreateSeasonDto) {
        return this.seasonService.updateSeason(id, season);
    }

    @Get('/tvshow/:id')
    getSeasonsByTVShow(@Param('id') id: number) {
        return this.seasonService.findSeasonsByTVShows(id);
    }

    // @Get('faker/seasons')
    // async fakeSeasons() {
    //     const rounds = 100;
    //     function getRandomInt(min, max) {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         return Math.floor(Math.random() * (max - min) + min);
    //     }

    //     for (let index = 0; index < rounds; index++) {
    //     const tvShowsNum = getRandomInt(1, 50)
    //     let shows = []
    //     for(let i = 0; i < tvShowsNum; i++) {
    //         const showId = getRandomInt(1, 80000)
    //         const show = await this.tvShowService.findTVShowById(showId);
    //             if (show) shows.push(show.id)
    //     }
    //     const name = faker.random.words()
    //     let user = null
    //     let userId = 0
    //     while(!user) {
    //         userId = getRandomInt(1, 200)
    //         user = await this.userService.findUserById(userId);
    //     }
    //         this.listService.createList({ name: name, tvShows: shows, user: userId } as CreateListDto)
    //     }

    //     return 0;
    // }
}
