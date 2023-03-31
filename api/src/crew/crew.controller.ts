import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCrewDto, CreateCrewTvShowDto } from './crew.dto';
import { CrewService } from './crew.service';

@Controller('crew')
export class CrewController {
    // constructor(private readonly crewService: CrewService) { }

    // @Get()
    // findCrew() {
    //     return this.crewService.findCrew();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createCrew(@Body() createCrewDto: CreateCrewDto) {
    //     return this.crewService.createCrew(createCrewDto);
    // }

    // @Get(':id')
    // getCrewById(@Param('id') id: number) {
    //     return this.crewService.findCrewById(id);
    // }

    // @Delete(':id')
    // deleteCrew(@Param('id', ParseIntPipe) id: number) {
    //     return this.crewService.deleteCrew(id);
    // }

    // @Put(':id')
    // async updateCrew(@Param('id') id: number, @Body() crew: CreateCrewDto) {
    //     return this.crewService.updateCrew(id, crew);
    // }

    // @Post('/member')
    // @UsePipes(ValidationPipe)
    // createMember(@Body() createCrewTvShowDto: CreateCrewTvShowDto) {
    //     return this.crewService.createCrewTvShow(createCrewTvShowDto);
    // }

    // @Get('/member/all')
    // findMembers() {
    //     return this.crewService.findCrewTvShow();
    // }

    // @Get('/member/:id')
    // findMemberById(@Param('id') id: number) {
    //     return this.crewService.findCrewTvShowById(id);
    // }

    // @Put('/member/:id')
    // updateMember(@Param('id') id: number, @Body() createCrewTvShowDto: CreateCrewTvShowDto) {
    //     return this.crewService.updateCrewTvShow(id, createCrewTvShowDto);
    // }
 
    // @Delete('/member/:id')
    // deleteMember(@Param('id') id: number) {
    //     return this.crewService.deleteCrewTvShow(id);
    // }

    // @Get('/member/tv-show/:id')
    // findMembersByTvShow(@Param('id') id: number) {
    //     return this.crewService.findCrewTvShowByTvShow(id);
    // }

    // @Get('/member/tv-show/:id/roles')
    // findMembersRolesByTvShow(@Param('id') id: number) {
    //     return this.crewService.findRolesByTvShow(id);
    // }
}
