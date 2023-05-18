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

    @Get('faker/cast')
    async fakeCast() {
        const rounds = 100;
        // function getRandomInt(min, max) {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);
        //     return Math.floor(Math.random() * (max - min) + min);
        // }

        for (let index = 1; index <= rounds; index++) {
            // for (let index = 0; index < rounds; index++) {
            const round = index;

            const options = {
                method: 'GET',
                url: `https://api.themoviedb.org/3/tv/${round}/aggregate_credits?language=en-US`,
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_AUTH
                }
            };

            const res = await fetch(options.url, options)
            const allCast = await res.json();
            // console.log(allCast);

            // console.log(allGenre);

            // const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
            // console.log(allGenre.tvShow.start_date)

            // const castList = []
         if (allCast.cast.length > 0) {
                for (const element of allCast.cast) {
                    // const genre = await this.castService.findGenreByName(element.name)
                    const cast = await fetch(`https://api.themoviedb.org/3/person/${element.id}?language=en-US`, options)
                    const castRes = await cast.json()
                    // console.log(castRes);


                    const exists = await this.castService.findCastByName(castRes.name)
                    // if (!exists) {
                    await this.castService.createCast({ name: castRes.name, photo: `https://image.tmdb.org/t/p/w500/${castRes.profile_path}`, biography: castRes.biography, roles: [1] })
                    const elNew = await this.castService.findCastByName(castRes.name)
                    const addId = await fetch(`https://api.themoviedb.org/3/tv/${round}/external_ids`, options)
                    const addIdRes = await addId.json()
                    console.log(round);


                    // console.log(element.id);

                    // console.log(castResult.id);

                    const elTv = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)
                    console.log(elTv.addId);

                    // console.log(await elNew);
                    // console.log(await elTv)

                    await this.castService.createCharacter({ character: element.roles[0].character, cast: elNew.id, tvShow: elTv.id })
                    // }
                    // else continue

                    // genreList.push(genre.id);
                }
            }

            if (allCast.crew.length > 0) {
                // console.log(round);


                for (const element of allCast.crew) {
                    // const genre = await this.castService.findGenreByName(element.name)
                    const cast = await fetch(`https://api.themoviedb.org/3/person/${element.id}?language=en-US`, options)
                    const castRes = await cast.json()
                    // console.log(castRes);


                    const allJobs = []
                    for (const el of element.jobs) {
                        let elEx = await this.roleService.findRoleByName(el.job)
                        // console.log(elEx);

                        if (!elEx) {
                            this.roleService.createRole({ name: el.job })
                            elEx = await this.roleService.findRoleByName(el.job)
                            console.log("stmh");
                            
                        }

                        console.log(elEx);


                        allJobs.push(elEx.id)
                    }

                    const exists = await this.castService.findCastByName(castRes.name)
                    // console.log(exists);
                    // console.log(allJobs);


                    // if (!exists)
                    this.castService.createCast({ name: castRes.name, photo: `https://image.tmdb.org/t/p/w500/${castRes.profile_path}`, biography: castRes.biography, roles: allJobs })
                    // else continue
                    // genreList.push(genre.id);
                }
            }

            // allGenre.genres.forEach(async element => {
            //     const genre = await this.genreService.findGenreByName(element.name)
            //     const genreAsync = genre;

            //     genreList.push(genreAsync);
            // });

            // const youtube = await fetch(`https://api.themoviedb.org/3/tv/${round}/videos?language=en-US`, options)
            // const youtubeRes = await youtube.json()

            // const addId = await fetch(`https://api.themoviedb.org/3/tv/${round}/external_ids`, options)
            // const addIdRes = await addId.json()
            // console.log(addIdRes.imdb_id);



            // const genre = this.genreService.findGenreByName()

            // this.tvShowService.createTvShow({ name: allGenre.name, genres: genreList, description: allGenre.overview, country: allGenre.origin_country, photo: `https://image.tmdb.org/t/p/w500/${allGenre.poster_path}`, length: allGenre.episode_run_time[0], trailer: `https://www.youtube.com/watch?v=${youtubeRes.results[0]?.key}`, year: allGenre.first_air_date, addId: addIdRes.imdb_id })
        }

        return 0;
    }
}
