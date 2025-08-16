import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { Episode } from './entity/episode.entity';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  findAll(sort: 'asc' | 'desc' = 'desc'): Episode[] {
    return this.episodes.sort((a, b) => {
      if (sort === 'asc') {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });
  }

  featured(): Episode[] {
    return this.episodes.filter((episode) => episode.featured);
  }

  findOne(id: string): Episode | undefined {
    return this.episodes.find((episode) => episode.id === id);
  }

  create(createEpisodeDto: CreateEpisodeDto): Episode {
    const newEpisode = { ...createEpisodeDto, id: randomUUID() };
    this.episodes.push(newEpisode);

    return newEpisode;
  }
}
