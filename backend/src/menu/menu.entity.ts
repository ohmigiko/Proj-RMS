import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from '../order/order.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Preset } from 'src/preset/preset.entity';

export class choice {
  name: string
  price: number
}
export class top {
  name: string
  choice: choice[]
  option: string
}
@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @Column("jsonb")
  topping: top[];

  @Column()
  average_time_min: number

  @Column()
  ordered: number

  @OneToMany(() => Order, order => order.menu)
  @JoinColumn({ name: 'id' })
  order: Order[]

  @Column()
  price: number

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @ManyToOne(() => Category, category => category.menu, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @OneToMany(() => Preset, preset => preset.menu)
  @JoinColumn({ name: 'id' })
  preset: Preset[]

  @Column({ nullable: true })
  create_by: string

  @Column()
  deleted: boolean
}
