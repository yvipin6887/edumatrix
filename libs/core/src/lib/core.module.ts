import { Module } from '@nestjs/common';
import { BaseRepository } from './repository/BaseRepository';

@Module({
  controllers: [],
  providers: [],
  exports: [BaseRepository],
})
export class CoreModule {}
