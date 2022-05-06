import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Table } from 'src/table/table.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Queue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  queue_num: string;

  @Column()
  @IsNotEmpty()
  queue_group: string;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  num_of_customer: number

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  table_id: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  table_name: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  status: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  order_method: string

  @IsString()
  @Column()
  is_ordered: boolean

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  delivery_num: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  delivery_by: string

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  phone: string

  @ManyToOne(() => Table, table => table.queue)
  @JoinColumn({ name: 'table_id' })
  table: Table;

  @OneToMany(() => Order, order => order.queue, { cascade: true })
  @JoinColumn({ name: 'id' })
  order: Order;

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column({ nullable: true })
  date_done: Date

  @Column()
  create_by: string
}
