import { Test, TestingModule } from '@nestjs/testing';
import { BookApplicationController } from './book-application.controller';

describe('BookApplicationController', () => {
  let controller: BookApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookApplicationController],
    }).compile();

    controller = module.get<BookApplicationController>(BookApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
