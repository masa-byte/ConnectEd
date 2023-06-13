import { Test, TestingModule } from '@nestjs/testing';
import { ProjectApplicationController } from './project-application.controller';

describe('ProjectApplicationController', () => {
  let controller: ProjectApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectApplicationController],
    }).compile();

    controller = module.get<ProjectApplicationController>(ProjectApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
