import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call findAll on the episodesService with the correct parameters', () => {
      const sort = 'asc';
      controller.findAll(sort);
      expect(mockEpisodesService.findAll).toHaveBeenCalledWith(sort);
    });
  });

  describe('findOne', () => {
    describe('when found', () => {
      const id = '1';
      const mockResult = { id, title: 'Test Episode' };

      beforeEach(() => {
        mockEpisodesService.findOne.mockReturnValue(mockResult);
      });
      it('should call findOne on the episodesService with the correct parameters', () => {
        const result = controller.findOne(id);

        expect(result).toEqual(mockResult);
        expect(mockEpisodesService.findOne).toHaveBeenCalledWith(id);
      });
    });

    describe('when not found', () => {
      const id = 'id3';
      beforeEach(() => {
        mockEpisodesService.findOne.mockReturnValue(null);
      });

      it('should return null', async () => {
        await expect(controller.findOne(id)).rejects.toThrow(
          'Episode not found',
        );
      });
    });
  });
});
