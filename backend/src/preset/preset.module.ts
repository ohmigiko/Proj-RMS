import { Module } from '@nestjs/common';
import { PresetService } from './preset.service';
import { PresetController } from './preset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PresetRepository } from './preset.repository';
import { MenuService } from 'src/menu/menu.service';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([PresetRepository]), MenuModule],
  providers: [PresetService],
  controllers: [PresetController]
})
export class PresetModule { }
