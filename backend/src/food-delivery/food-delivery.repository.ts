import { EntityRepository, Repository } from "typeorm";
import { Food_Delivery } from "./food-delivery.entity";


@EntityRepository(Food_Delivery)
export class Food_DeliveryRepository extends Repository<Food_Delivery> {

    async createFoodDelivery(createFoodDeliveryDto, user): Promise<Food_Delivery> {
        const { name, color } = createFoodDeliveryDto
        const fooddelivery = this.create({
            name: name,
            color: color

        })
        await this.save(fooddelivery)
        return fooddelivery
    }

    async getFoodDelivery(): Promise<Food_Delivery[]> {
        return this.find()
    }
}
