import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { CreateSeasonDto } from './season.dto';
import { SeasonService } from './season.service';
import fetch from 'cross-fetch';
import { EpisodeService } from 'src/episode/episode.service';

@Controller('seasons')
export class SeasonController {
    constructor(
        private readonly seasonService: SeasonService,
        private readonly tvShowService: TvShowService,
        private readonly episodeService: EpisodeService,
    ) { }

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

    @Get('/tvshow/count/:id')
    getNumSeasonsByTVShow(@Param('id') id: number) {
        return this.seasonService.findNumSeasonsByTVShows(id);
    }

    // @Get('faker/seasons')
    // async fakeSeasons() {
    //     const rounds = 50000;
    //     function getRandomInt(min, max) {
    //         min = Math.ceil(min);
    //         max = Math.floor(max);
    //         return Math.floor(Math.random() * (max - min) + min);
    //     }

    //     for (let index = 0; index < rounds; index++) {
    //         const tvShowsNum = getRandomInt(1, 50)
    //         let shows = []
    //         for (let i = 0; i < tvShowsNum; i++) {
    //             const showId = getRandomInt(1, 80000)
    //             const show = await this.tvShowService.findTVShowById(showId);
    //             if (show) {
    //                 const res = await fetch("https://www.episodate.com/api/show-details?q=" + getRandomInt(1, 80000), {
    //                     method: "GET"
    //                 })
    //                 const allGenre = await res.json();
    //                 const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
    //                 const seasons = []

    //                 if (show) {
    //                     if (allGenre.tvShow.episodes) {
    //                         allGenre.tvShow.episodes.forEach((item) => {
    //                             if (seasons.indexOf(item.season) === -1) {
    //                                 seasons.push(item.season);
    //                             }
    //                         });

    //                         seasons.forEach(element => {
    //                             this.seasonService.createSeason({ tvShow: show.id, numSeason: element } as CreateSeasonDto)                               
    //                         });
    //                     }
    //                 }
    //                 // console.log(seasons);

    //                 // this.seasonService.createSeason({ tvShow: show.id, numSeason: seasons[0] } as CreateSeasonDto)
    //             }
    //         }
    //         // const name = faker.random.words()
    //         // let user = null
    //         // let userId = 0
    //         // while (!user) {
    //         //     userId = getRandomInt(1, 200)
    //         //     user = await this.userService.findUserById(userId);
    //         // }
    //         // this.listService.createList({ name: name, tvShows: shows, user: userId } as CreateListDto)
    //     }

    //     return 0;
    // }

    @Get('faker/seasons')
    async fakeSeasons() {
        // const rounds = 15;
        // function getRandomInt(min, max) {
        //     min = Math.ceil(min);
        //     max = Math.floor(max);
        //     return Math.floor(Math.random() * (max - min) + min);
        const options = {
            method: 'GET',
            url: `https://api.themoviedb.org/3/tv/popular?language=en-US&page=2`,
            headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_AUTH
            }
        };

        const res = await fetch(options.url, options)
        const allGenre = await res.json();

        for (let index = 0; index <= allGenre.results.length; index++) {
            const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
            const addIdRes = await addId.json()
            // }

            const show = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)
            console.log(addIdRes.imdb_id);
                for (let ix = 1; ix <= allGenre.results.length; ix++) {

                    const options = {
                        method: 'GET',
                        url: `https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/season/${ix}?language=en-US`,
                        headers: {
                            accept: 'application/json',
                            Authorization: process.env.TMDB_AUTH
                        }
                    };

                    const res = await fetch(options.url, options)
                    const allCast = await res.json();
                    // console.log(round);
                    // console.log(ix);

                    // console.log(allCast);


                    if (allCast.success == false) {
                        // console.log(allCast);
                        break;
                    }
                    else {
                        const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
                        const addIdRes = await addId.json()
                        const show = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)
                    

                        if (addIdRes.imdb_id != null && show) {
                            const season = await this.seasonService.createSeason({ tvShow: show.id, numSeason: ix })
                            // console.log(allCast);

                            // console.log(allGenre);

                            // const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
                            // console.log(allGenre.tvShow.start_date)

                            // const castList = []
                            // if (allCast.cast.length > 0) {

                            // console.log("hey "+allCast.episodes[0].id);

                            for (const element of allCast.episodes) {
                                console.log(element.name);

                                // const genre = await this.castService.findGenreByName(element.name)
                                // const cast = await fetch(`https://api.themoviedb.org/3/person/${element.id}?language=en-US`, options)
                                // const castRes = await cast.json()
                                // console.log(castRes);
                                this.episodeService.createEpisode({ name: element.name, season: season.id, numEp: element.episode_number })

                                // const exists = await this.castService.findCastByName(castRes.name)
                                // // if (!exists) {
                                // await this.castService.createCast({ name: castRes.name, photo: `https://image.tmdb.org/t/p/w500/${castRes.profile_path}`, biography: castRes.biography, roles: [1] })
                                // const elNew = await this.castService.findCastByName(castRes.name)
                                // const addId = await fetch(`https://api.themoviedb.org/3/tv/${round}/external_ids`, options)
                                // const addIdRes = await addId.json()
                                // console.log(round);


                                // // console.log(element.id);

                                // // console.log(castResult.id);

                                // const elTv = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)
                                // console.log(elTv.addId);

                                // // console.log(await elNew);
                                // // console.log(await elTv)

                                // await this.castService.createCharacter({ character: element.roles[0].character, cast: elNew.id, tvShow: elTv.id })
                                // // }
                                // // else continue

                                // // genreList.push(genre.id);
                            }
                        }
                    }
                }
            
        }

        return 0;
    }
}
