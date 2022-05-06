import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueueController } from './queue/queue.controller';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { QueueService } from './queue/queue.service';
import { QueueModule } from './queue/queue.module';
import { OrderModule } from './order/order.module';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TableModule } from './table/table.module';
import { PaymentModule } from './payment/payment.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { DataStorageModule } from './data-storage/data-storage.module';
import { MenuModule } from './menu/menu.module';
import { CategoryModule } from './category/category.module';
import { PresetModule } from './preset/preset.module';
import { FoodDeliveryModule } from './food-delivery/food-delivery.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [QueueModule, OrderModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 62464,
    username: 'postgres',
    password: 'password',
    database: 'proj-res',
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, TableModule, PaymentModule, AuthModule, DataStorageModule, MenuModule, CategoryModule, PresetModule, FoodDeliveryModule],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule { }
