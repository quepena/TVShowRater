import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCastDto, CreateCastTvShowDto } from './cast.dto';
import { CastService } from './cast.service';

@Controller('cast')
export class CastController {
    constructor(private readonly castService: CastService) { }

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
}
