import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.entity';
import { CreatePresetDto } from './dto/createPreset.dto';
import { GetPresetDto } from './dto/getPreset.dto';
import { UpdatePresetEditDto } from './dto/updatePresetEdit.dto';
import { PresetService } from './preset.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('preset')
export class PresetController {
    constructor(private presetService: PresetService) { }

    @Post()
    createPreset(@Body() createPresetDto: CreatePresetDto, @GetUser() user: User) {
        return this.presetService.createPreset(createPresetDto, user)
    }


    @Get()
    getPreset(@Body() getPresetDto: GetPresetDto) {
        return this.presetService.getPreset(getPresetDto)
    }

    @Delete('/:id')
    deletePreset(@Param('id') id: string) {
        return this.presetService.deletePreset(id)
    }

    @Patch('/:id')
    editPreset(@Param('id') id: string, updatePresetEditDto: UpdatePresetEditDto) {
        return this.presetService.editPreset(id, updatePresetEditDto)
    }

}
