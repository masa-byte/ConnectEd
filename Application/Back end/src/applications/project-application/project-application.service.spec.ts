import { Test, TestingModule } from '@nestjs/testing';
import { ProjectApplicationService } from './project-application.service';

describe('ProjectApplicationService', () => {
  let service: ProjectApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectApplicationService],
    }).compile();

    service = module.get<ProjectApplicationService>(ProjectApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
