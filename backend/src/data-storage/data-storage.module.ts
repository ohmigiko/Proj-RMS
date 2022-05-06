import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataStorageService } from './data-storage.service';
import { DataStorageRepository } from './data-storage.repository';

@Module({
  providers: [DataStorageService],
  imports: [TypeOrmModule.forFeature([DataStorageRepository])],
  exports: [DataStorageService]
})
export class DataStorageModule { }
