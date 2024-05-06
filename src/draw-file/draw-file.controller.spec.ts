import { Test, TestingModule } from '@nestjs/testing';
import { DrawFileController } from './draw-file.controller';

describe('DrawFileController', () => {
  let controller: DrawFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawFileController],
    }).compile();

    controller = module.get<DrawFileController>(DrawFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
