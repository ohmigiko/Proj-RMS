import { Module } from '@nestjs/common';
import { FoodDeliveryService } from './food-delivery.service';
import { FoodDeliveryController } from './food-delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueRepository } from 'src/queue/queue.repository';
import { Food_DeliveryRepository } from './food-delivery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Food_DeliveryRepository])],
  providers: [FoodDeliveryService],
  controllers: [FoodDeliveryController]
})
export class FoodDeliveryModule { }
