import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food_Delivery } from './food-delivery.entity';
import { Food_DeliveryRepository } from './food-delivery.repository';

@Injectable()
export class FoodDeliveryService {
    constructor(
        @InjectRepository(Food_DeliveryRepository)
        public food_DeliveryRepository: Food_DeliveryRepository,
    ) { }

    createFoodDelivery(createFoodDeliveryDto, user): Promise<Food_Delivery> {
        return this.food_DeliveryRepository.createFoodDelivery(createFoodDeliveryDto, user)
    }

    getFoodDelivery(): Promise<Food_Delivery[]> {
        return this.food_DeliveryRepository.getFoodDelivery()
    }
}
