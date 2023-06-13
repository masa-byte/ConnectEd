import { Test, TestingModule } from '@nestjs/testing';
import { BookApplicationService } from './book-application.service';

describe('BookApplicationService', () => {
  let service: BookApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookApplicationService],
    }).compile();

    service = module.get<BookApplicationService>(BookApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
