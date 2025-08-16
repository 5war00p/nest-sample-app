import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { ConfigService } from '../config/config.service';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    private configService: ConfigService,
  ) {}

  @Get()
  findAll(@Query('sort') sort: 'asc' | 'desc' = 'desc') {
    return this.episodesService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const episode = this.episodesService.findOne(id);
    if (!episode) {
      return Promise.reject(new NotFoundException('Episode not found'));
    }
    return episode;
  }

  @Post()
  create(@Body() episode: CreateEpisodeDto) {
    return this.episodesService.create(episode);
  }
}
