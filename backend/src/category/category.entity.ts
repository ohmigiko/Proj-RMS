import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Order } from '../order/order.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from 'src/menu/menu.entity';
import { Preset } from 'src/preset/preset.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @OneToMany(() => Menu, menu => menu.category)
  @JoinColumn({ name: 'id' })
  menu: Menu[]

  // @OneToMany(() => Preset, preset => preset.category)
  // @JoinColumn({ name: 'id' })
  // preset: Preset[]

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column()
  deleted: boolean
}
