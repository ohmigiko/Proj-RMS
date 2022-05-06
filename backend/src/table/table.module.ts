import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TableController } from './table.controller';
import { TableRepository } from './table.repository';
import { TableService } from './table.service';

@Module({
  imports: [TypeOrmModule.forFeature([TableRepository])],
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService]
})
export class TableModule { }
