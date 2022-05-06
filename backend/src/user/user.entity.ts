import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/auth/role.enum';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ unique: true })
  @IsString()
  @IsNotEmpty()
  id: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  role: Role

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column()
  @IsNotEmpty()
  deleted: boolean

}
