import { Test, TestingModule } from '@nestjs/testing';
import { FacultyMemberController } from './faculty-member.controller';

describe('FacultyMemberController', () => {
  let controller: FacultyMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultyMemberController],
    }).compile();

    controller = module.get<FacultyMemberController>(FacultyMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
