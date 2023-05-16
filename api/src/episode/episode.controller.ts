import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSeasonDto } from 'src/season/season.dto';
import { SeasonService } from 'src/season/season.service';
import { CreateTvShowDto } from 'src/tv-show/tv-show.dto';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { CreateEpisodeDto } from './episode.dto';
import { EpisodeService } from './episode.service';
import fetch from 'cross-fetch';

@Controller('episodes')
export class EpisodeController {
    constructor(
        private readonly episodeService: EpisodeService,
        private readonly tvShowService: TvShowService,
        private readonly seasonService: SeasonService
    ) { }

    @Get()
    findEpisode() {
        return this.episodeService.findEpisode();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createEpisode(@Body() createEpisodeDto: CreateEpisodeDto) {
        return this.episodeService.createEpisode(createEpisodeDto);
    }

    @Get(':id')
    getEpisodeById(@Param('id') id: number) {
        return this.episodeService.findEpisodeById(id);
    }

    @Delete(':id')
    deleteEpisode(@Param('id', ParseIntPipe) id: number) {
        return this.episodeService.deleteEpisode(id);
    }

    @Put(':id')
    async updateEpisode(@Param('id') id: number, @Body() episode: CreateEpisodeDto) {
        return this.episodeService.updateEpisode(id, episode);
    }

    @Get('/season/:id')
    getEpisodesBySeasons(@Param('id') id: number) {
        return this.episodeService.findEpisodesBySeasons(id);
    }

    @Get('faker/episodes')
    async fakeSeasons() {
        const rounds = 50;
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min);
        }

        for (let index = 0; index < rounds; index++) {
            const res = await fetch("https://www.episodate.com/api/show-details?q=" + getRandomInt(1, 80000), {
                method: "GET",
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                    Accept: "application/json; charset=UTF-8",
                }
            })
            const allGenre = await res.json();
            const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
            if (show) {
                console.log("show");
                
                // console.log(show);
                const season = await this.seasonService.findSeasonsByTVShows(show.id);
                const seasons = []
                if (season) {
                    // console.log("seas  " + season);
                    // console.log(allGenre.tvShow);

                    if (allGenre.tvShow.episodes) {
                        season.forEach(el => {
                            allGenre.tvShow.episodes.forEach((item) => {
                                console.log(item);
                                
                                if(item.season == el.numSeason)
                                this.episodeService.createEpisode({ name: item.name, season: el.id, numEp: item.episode } as CreateEpisodeDto)
                                    // seasons.push([item.episode, item.name]);
                            });
                            // console.log("what?");

                            // seasons.forEach(element => {
                                // console.log(element);

                            // });
                        });
                    }
                }
                else {
                    if (allGenre.tvShow.episodes) {
                        allGenre.tvShow.episodes.forEach((item) => {
                            if (seasons.indexOf(item.season) === -1) {
                                seasons.push(item.season);
                            }
                        });

                        seasons.forEach(element => {
                            this.seasonService.createSeason({ tvShow: show.id, numSeason: element } as CreateSeasonDto)
                        });

                        const season = await this.seasonService.findSeasonsByTVShows(show.id);

                        season.forEach(el => {
                            allGenre.tvShow.episodes.forEach((item) => {
                                console.log("1 + "+item);
                                
                                if(item.season == el.numSeason)
                                    // seasons.push([item.episode, item.name]);
                                    this.episodeService.createEpisode({ name: item.name, season: el.id, numEp: item.episode } as CreateEpisodeDto)
                            });

                            // seasons.forEach(element => {
                                // console.log(element);

                                // this.episodeService.createEpisode({ name: seasons[1], season: el.id, numEp: seasons[0] } as CreateEpisodeDto)
                            // });
                        });

                    }
                }

            }
            else {
                const show = this.tvShowService.createTvShow({ name: allGenre.tvShow.name, genres: allGenre.tvShow.genres, description: allGenre.tvShow.description, country: allGenre.tvShow.country, photo: allGenre.tvShow.image_thumbnail_path, length: allGenre.tvShow.runtime, trailer: allGenre.tvShow.youtube_link, year: allGenre.tvShow.start_date, addId: allGenre.tvShow.id } as CreateTvShowDto)
                // const show = await this.tvShowService.findShowByName(allGenre.tvShow.name);
                const showC = await show;
                console.log("no show");
                
                // console.log(showC);
                
                

                // if (show) {
                //     const season = await this.seasonService.findSeasonsByTVShows(show.id);
                //     const seasons = []
                //     if (season) {
                //         if (allGenre.tvShow.episodes) {
                //             season.forEach(el => {
                //                 allGenre.tvShow.episodes.forEach((item) => {
                //                     seasons.push(item.episode, item.name);
                //                 });

                //                 seasons.forEach(element => {
                //                     console.log(element);

                //                     this.episodeService.createEpisode({ name: seasons[1], season: el.id, numEp: seasons[0] } as CreateEpisodeDto)
                //                 });
                //             });
                //         }
                //     } else {
                    const seasons = []
                        if (allGenre.tvShow.episodes) {
                            allGenre.tvShow.episodes.forEach((item) => {
                                if (seasons.indexOf(item.season) === -1) {
                                    seasons.push(item.season);
                                }
                            });

                            seasons.forEach(element => {
                                this.seasonService.createSeason({ tvShow: showC.id, numSeason: element } as CreateSeasonDto)
                            });

                            console.log(showC.id);
                            
                            const season = await this.seasonService.findSeasonsByTVShows(showC.id);
                            console.log(season);
                                                       

                            season.forEach(el => {
                                console.log(el.numSeason);
                                
                                allGenre.tvShow.episodes.forEach((item) => {
                                    if(item.season == el.numSeason)
                                        this.episodeService.createEpisode({ name: item.name, season: el.id, numEp: item.episode } as CreateEpisodeDto)
                                });
                            });


                        // }
                    // }
                }
            }
        }
        return 0;
    }
}
