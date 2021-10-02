import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [],
  providers: [DatabaseService],
})
export class DatabaseModule {}
