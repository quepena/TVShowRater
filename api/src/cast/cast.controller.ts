import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCastDto } from './cast.dto';
import { CastService } from './cast.service';

@Controller('cast')
export class CastController {
    constructor(private readonly castService: CastService) { }

    @Get()
    findCast() {
        return this.castService.findCast();
    }

    @Get(':id')
    findCastById(@Param('id') id: number) {
        return this.castService.findCastById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGenre(@Body() createCastDto: CreateCastDto) {
        return this.castService.createCast(createCastDto);
    }

    @Put(':id')
    updateCast(@Param('id') id: number, @Body() createCastDto: CreateCastDto) {
        return this.castService.updateCast(id, createCastDto);
    }
 
    @Delete(':id')
    deleteCast(@Param('id') id: number) {
        return this.castService.deleteCast(id);
    }
}
