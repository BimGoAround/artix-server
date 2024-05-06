import { Test, TestingModule } from '@nestjs/testing';
import { DrawFileService } from './draw-file.service';

describe('DrawFileService', () => {
  let service: DrawFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawFileService],
    }).compile();

    service = module.get<DrawFileService>(DrawFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
