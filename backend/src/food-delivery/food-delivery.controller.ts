import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { User } from 'src/user/user.entity';
import { CreateFoodDeliveryDto } from './dto/createFoodDelivery.dto';
import { Food_Delivery } from './food-delivery.entity';
import { FoodDeliveryService } from './food-delivery.service';

@Controller('food-delivery')
export class FoodDeliveryController {
    constructor(public foodDeliveryService: FoodDeliveryService) { }

    @Post()
    createFoodDelivery(@Body() createFoodDeliveryDto: CreateFoodDeliveryDto, @GetUser() user: User): Promise<Food_Delivery> {
        return this.foodDeliveryService.createFoodDelivery(createFoodDeliveryDto, user)
    }

    @Get()
    getFoodDelivery(): Promise<Food_Delivery[]> {
        return this.foodDeliveryService.getFoodDelivery()
    }
}
