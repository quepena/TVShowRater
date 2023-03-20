import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProgressDto } from './progress.dto';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
    constructor(private readonly progressService: ProgressService) { }

    @Get()
    findProgress() {
        return this.progressService.findProgress();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createProgress(@Body() createProgressDto: CreateProgressDto) {
        return this.progressService.createProgress(createProgressDto);
    }

    @Get(':id')
    getProgressById(@Param('id') id: number) {
        return this.progressService.findProgressById(id);
    }

    @Delete(':id')
    deleteProgress(@Param('id', ParseIntPipe) id: number) {
        return this.progressService.deleteProgress(id);
    }

    @Put(':id')
    async updateProgress(@Param('id') id: number, @Body() progress: CreateProgressDto) {
        return this.progressService.updateProgress(id, progress);
    }

    @Get('/user/:id')
    getProgressByUser(@Param('id') id: number) {
        return this.progressService.findProgressByUser(id);
    }
}
