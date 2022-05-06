import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuService } from 'src/menu/menu.service';
import { User } from 'src/user/user.entity';
import { CreatePresetDto } from './dto/createPreset.dto';
import { GetPresetDto } from './dto/getPreset.dto';
import { UpdatePresetEditDto } from './dto/updatePresetEdit.dto';
import { PresetRepository } from './preset.repository';

@Injectable()
export class PresetService {

    constructor(
        @InjectRepository(PresetRepository)
        private presetRepository: PresetRepository,
        private menuService: MenuService
    ) { }

    async createPreset(createPresetDto: CreatePresetDto, user: User) {
        const { menu_id } = createPresetDto
        const menu = await this.menuService.getMenu(menu_id)
        return this.presetRepository.createPreset(createPresetDto, user, menu)
    }

    getPreset(getPresetDto: GetPresetDto) {
        return this.presetRepository.getPreset(getPresetDto)
    }

    deletePreset(id: string) {
        return this.presetRepository.deletePreset(id)
    }

    async editPreset(id: string, updatePresetEditDto: UpdatePresetEditDto) {
        const preset = await this.presetRepository.findOne({ where: { id } })
        const menu = await this.menuService.getMenu(preset.menu_id)
        return this.presetRepository.editPreset(id, updatePresetEditDto, menu)
    }
}
