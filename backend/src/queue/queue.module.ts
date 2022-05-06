import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueRepository } from './queue.repository';
import { DataStorageModule } from 'src/data-storage/data-storage.module';
import { TableService } from 'src/table/table.service';
import { TableModule } from 'src/table/table.module';

@Module({
  imports: [TypeOrmModule.forFeature([QueueRepository]), DataStorageModule, TableModule],
  providers: [QueueService],
  controllers: [QueueController],
  exports: [QueueService]
})
export class QueueModule { }
