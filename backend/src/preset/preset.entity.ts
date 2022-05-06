import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Menu } from '../menu/menu.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/category/category.entity';

@Entity()
export class Preset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  menu_id: string;

  @Column("jsonb")
  topping: object[];

  @Column()
  price: number

  @ManyToOne(() => Menu, menu => menu.preset, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column()
  estimated_time_min: number

  @Column()
  create_by: string

  // @ManyToOne(() => Category, category => category.preset)
  // @JoinColumn({ name: 'category_id' })
  // category: Category

}
