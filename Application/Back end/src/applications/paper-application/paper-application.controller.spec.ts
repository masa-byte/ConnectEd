import { Test, TestingModule } from '@nestjs/testing';
import { PaperApplicationController } from './paper-application.controller';

describe('PaperApplicationController', () => {
  let controller: PaperApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaperApplicationController],
    }).compile();

    controller = module.get<PaperApplicationController>(PaperApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
