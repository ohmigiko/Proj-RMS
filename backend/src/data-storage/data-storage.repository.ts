import { EntityRepository, Repository } from "typeorm";
import { CreateDataStorageDto } from "./dto/createDataStorage.dto";
import { DataStorage } from "./data-storage.entity";
import { EditDataStorageDto } from "./dto/editDataStorage.dto";
import { GetDataStorageDto } from "./dto/getDataStorage.dto";

@EntityRepository(DataStorage)
export class DataStorageRepository extends Repository<DataStorage> {
    async createDataStorage(createDataStorageDto: CreateDataStorageDto): Promise<DataStorage> {
        const { name, data } = createDataStorageDto
        const data_storage = this.create({
            name,
            data
        })
        await this.save(data_storage)
        return data_storage
    }

    async editDataStorage(editDataStorageDto: EditDataStorageDto): Promise<DataStorage> {
        const { name, data } = editDataStorageDto
        const data_storage = await this.findOne({ where: { name: name } })
        data_storage.data = data
        await this.update(data_storage.id, data_storage)
        return data_storage
    }

    async getDataStorage(getDataStorageDto: GetDataStorageDto): Promise<DataStorage> {
        const { name } = getDataStorageDto
        const data_storage = await this.findOne({ where: { name: name } })
        return data_storage
    }
}
