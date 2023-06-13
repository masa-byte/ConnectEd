import { Test, TestingModule } from '@nestjs/testing';
import { PaperApplicationService } from './paper-application.service';

describe('PaperApplicationService', () => {
  let service: PaperApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaperApplicationService],
    }).compile();

    service = module.get<PaperApplicationService>(PaperApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
