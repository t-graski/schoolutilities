import { Test, TestingModule } from '@nestjs/testing';
import { UntisImportController } from './untis-import.controller';
import { UntisImportService } from './untis-import.service';

describe('UntisImportController', () => {
  let controller: UntisImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UntisImportController],
      providers: [UntisImportService],
    }).compile();

    controller = module.get<UntisImportController>(UntisImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
