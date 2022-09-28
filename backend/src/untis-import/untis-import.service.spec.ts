import { Test, TestingModule } from '@nestjs/testing';
import { UntisImportService } from './untis-import.service';

describe('UntisImportService', () => {
  let service: UntisImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UntisImportService],
    }).compile();

    service = module.get<UntisImportService>(UntisImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
