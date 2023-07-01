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

    @Get('faker/seasons')
    async fakeSeasons() {
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

                if (allCast.success == false) {
                    break;
                }
                else {
                    const addId = await fetch(`https://api.themoviedb.org/3/tv/${allGenre.results[index].id}/external_ids`, options)
                    const addIdRes = await addId.json()
                    const show = await this.tvShowService.findTVShowByAddId(addIdRes.imdb_id)

                    if (addIdRes.imdb_id != null && show) {
                        const season = await this.seasonService.createSeason({ tvShow: show.id, numSeason: ix })

                        for (const element of allCast.episodes) {
                            this.episodeService.createEpisode({ name: element.name, season: season.id, numEp: element.episode_number })
                        }
                    }
                }
            }

        }

        return 0;
    }
}
