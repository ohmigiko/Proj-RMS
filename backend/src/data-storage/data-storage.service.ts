import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDataStorageDto } from './dto/createDataStorage.dto';
import { EditDataStorageDto } from './dto/editDataStorage.dto';
import { DataStorage } from './data-storage.entity';
import { DataStorageRepository } from './data-storage.repository';
import { GetDataStorageDto } from './dto/getDataStorage.dto';

@Injectable()
export class DataStorageService {
    constructor(
        @InjectRepository(DataStorageRepository)
        public dataStorageRepository: DataStorageRepository,
    ) { }

    createDataStorage(@Body() createDataStorageDto: CreateDataStorageDto): Promise<DataStorage> {
        return this.dataStorageRepository.createDataStorage(createDataStorageDto)
    }

    editDataStorage(@Body() editDataStorageDto: EditDataStorageDto): Promise<DataStorage> {
        return this.dataStorageRepository.editDataStorage(editDataStorageDto)
    }

    getDataStorage(@Body() getDataStorageDto: GetDataStorageDto): Promise<DataStorage> {
        return this.dataStorageRepository.getDataStorage(getDataStorageDto)
    }
}
