import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [ApiModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
