import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('episodes')
export class EpisodesController {
  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    console.log('>>> ~ EpisodesController ~ findAll ~ sort:', sort);
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('>>> ~ EpisodesController ~ findOne ~ id:', id);
    return {};
  }

  @Post()
  create() {
    return {};
  }
}
