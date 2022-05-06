import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  total_payed: number

  @Column()
  method: string

  @Column()
  @IsNotEmpty()
  queue_num: string

  @Column()
  @IsNotEmpty()
  queue_group: string

  @Column()
  @IsNotEmpty()
  order_method: string

  @Column({ nullable: true })
  delivery_by: string

  @Column("jsonb")
  Order: object[]

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  table_id: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  table_name: string

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column({ nullable: true })
  create_by: string
}
