import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Menu } from '../menu/menu.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Queue } from 'src/queue/queue.entity';
import { Food_Delivery } from 'src/food-delivery/food-delivery.entity';
import { Category } from 'src/category/category.entity';

interface choice {
  name: string,
  price: number
}

export interface topping {
  name: string,
  price: number,
  choice: choice
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsNotEmpty()
  @IsString()
  menu_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  queue_id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  menu_id: string;

  @Column("jsonb")
  topping: topping[];

  @Column()
  price: number

  @ManyToOne(() => Menu, menu => menu.order)
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => Queue, queue => queue.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'queue_id' })
  queue: Queue;

  @ManyToOne(() => Queue, queue => queue.order)
  @JoinColumn({ name: 'delivery' })
  @Column({ nullable: true })
  delivery: Food_Delivery;

  @Column()
  quantity: number;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  urgent: boolean;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  take_home: boolean;

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column({ nullable: true })
  date_done: Date

  @Column()
  estimated_time_min: number

  @Column()
  create_by: string

  @Column({ nullable: true })
  cook_by: string

  @Column({ nullable: true })
  time_taken_min: number


}
