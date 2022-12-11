import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCastDto } from './cast.dto';
import { CastService } from './cast.service';

@Controller('cast')
export class CastController {
    constructor(private readonly castService: CastService) { }

    @Get()
    findCast() {
        return this.castService.findCast();
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createGenre(@Body() createCastDto: CreateCastDto) {
        return this.castService.createCast(createCastDto);
    }
}
