import { Test, TestingModule } from '@nestjs/testing';
import { FacultyMemberService } from './faculty-member.service';

describe('FacultyMemberService', () => {
  let service: FacultyMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacultyMemberService],
    }).compile();

    service = module.get<FacultyMemberService>(FacultyMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
