import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { CreateCastDto, CreateCastTvShowDto } from './cast.dto';
import { CastService } from './cast.service';
import fetch from 'cross-fetch';

@Controller('cast')
export class CastController {
    constructor(
        private readonly castService: CastService,
        private readonly roleService: RoleService,
        private readonly tvShowService: TvShowService,
    ) { }

    @Get()
    findCast() {
        return this.castService.findCast();
    }

    @Get('/:id')
    findCastById(@Param('id') id: number) {
        return this.castService.findCastById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCast(@Body() createCastDto: CreateCastDto) {
        return this.castService.createCast(createCastDto);
    }

    @Put('/:id')
    updateCast(@Param('id') id: number, @Body() createCastDto: CreateCastDto) {
        return this.castService.updateCast(id, createCastDto);
    }

    @Delete('/:id')
    deleteCast(@Param('id') id: number) {
        return this.castService.deleteCast(id);
    }

    @Get('/tv-show/:id')
    getCastByTvShow(@Param('id') id: number) {
        return this.castService.findCastByTvShow(id);
    }

    @Post('/character')
    @UsePipes(ValidationPipe)
    createCharacter(@Body() createCastTvShowDto: CreateCastTvShowDto) {
        return this.castService.createCharacter(createCastTvShowDto);
    }

    @Get('/character/all')
    findCharacters() {
        return this.castService.findCharacters();
    }

    @Get('/character/:id')
    findCharacterById(@Param('id') id: number) {
        return this.castService.findCharacterById(id);
    }

    @Put('/character/:id')
    updateCharacter(@Param('id') id: number, @Body() createCastTvShowDto: CreateCastTvShowDto) {
        return this.castService.updateCharacter(id, createCastTvShowDto);
    }

    @Delete('/character/:id')
    deleteCharacter(@Param('id') id: number) {
        return this.castService.deleteCharacter(id);
    }

    @Get('/show/actors/:id')
    findActorsByShow(@Param('id') id: number) {
        return this.castService.findActorsByShow(id)
    }

    @Get('/show/crew/:id')
    findCrewByShow(@Param('id') id: number) {
        return this.castService.findCrew(id)
    }

    @Get('faker/cast')
    async fakeCast() {
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=3`,
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_AUTH
            }
        };

        const res = await fetch(options.url, options)
        const allGenre = await res.json();

        for (let index = 1; index <= allGenre.results.length; index++) {
            const round = index;

            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/aggregate_credits?language=en-US`,
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_AUTH
                }
            };

            const res = await fetch(options.url, options)
            const allCast = await res.json();

            if (allCast.cast.length > 0) {
                for (const element of allCast.cast) {
                    const cast = await fetch(`https://api.themoviedb.org/3/person/${element.id}?language=en-US`, options)
                    const castRes = await cast.json()

                    const exists = await this.castService.findCastByName(castRes.name)
                    await this.castService.createCast({ name: castRes.name, photo: `https://image.tmdb.org/t/p/w500/${castRes.profile_path}`, biography: castRes.biography, roles: [1] })
                    const elNew = await this.castService.findCastByName(castRes.name)
                    const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
                    const addIdRes = await addId.json()

                    const elTv = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)

                    for (const el of element.roles)
                        await this.castService.createCharacter({ character: el.character, cast: elNew.id, tvShow: elTv.id })
                }
            }

            if (allCast.crew.length > 0) {
                for (const element of allCast.crew) {
                    const cast = await fetch(`https://api.themoviedb.org/3/person/${element.id}?language=en-US`, options)
                    const castRes = await cast.json()

                    const allJobs = []
                    for (const el of element.jobs) {
                        let elEx = await this.roleService.findRoleByName(el.job)

                        if (!elEx) {
                            await this.roleService.createRole({ name: el.job })
                            elEx = await this.roleService.findRoleByName(el.job)
                        }
                        allJobs.push(elEx.id)
                    }
                    const newCast = await this.castService.createCast({ name: castRes.name, photo: `https://image.tmdb.org/t/p/w500/${castRes.profile_path}`, biography: castRes.biography, roles: allJobs })
                    const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
                    const addIdRes = await addId.json()
                    const elTv = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)
                    await this.castService.createCharacter({ character: null, cast: newCast.id, tvShow: elTv.id })
                }
            }
        }

        return 0;
    }
}
