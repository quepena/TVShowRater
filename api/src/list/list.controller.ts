import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { CreateListDto } from './list.dto';
import { ListService } from './list.service';
import { faker } from '@faker-js/faker'
import { UserService } from 'src/user/user.service';

@Controller('lists')
export class ListController {
    constructor(private readonly listService: ListService, private readonly tvShowService: TvShowService, private readonly userService: UserService) { }

    @Get()
    findList() {
        return this.listService.findLists();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createList(@Body() createListDto: CreateListDto) {
        return this.listService.createList(createListDto);
    }

    @Get(':id')
    getListById(@Param('id') id: number) {
        return this.listService.findListById(id);
    }

    @Delete(':id')
    deleteList(@Param('id', ParseIntPipe) id: number) {
        return this.listService.deleteList(id);
    }

    @Put(':id')
    async updateList(@Param('id') id: number, @Body() list: CreateListDto) {
        return this.listService.updateList(id, list);
    }

    @Get('/user/:id')
    getListsByUser(@Param('id') id: number) {
        return this.listService.findListsByUser(id);
    }

    @Get('name/:name')
    getListsByName(@Param('name') name: string) {
        return this.listService.findAdminListByName(name);
    }

    @Get('faker/lists')
    async fakeLists() {
        const rounds = 10;
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        for (let index = 0; index < rounds; index++) {
            const tvShowsNum = getRandomInt(1, 3)
            let shows = []
            for (let i = 0; i < tvShowsNum; i++) {
                const showId = getRandomInt(1, 20)
                const show = await this.tvShowService.findTVShowById(showId);
                if (show) shows.push(show.id)
            }
            const name = faker.random.words()
            // let user = null
            // let userId = 0
            // while (!user) {
            //     userId = getRandomInt(1, 20)
            //     user = await this.userService.findUserById(userId);
            // }
            console.log(shows);
            
            this.listService.createList({ name: name, tvShows: shows, user: 118 } as CreateListDto)
        }

        return 0;
    }
}
