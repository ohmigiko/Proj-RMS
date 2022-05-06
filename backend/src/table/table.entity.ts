import { IsNotEmpty } from 'class-validator';
import { Queue } from 'src/queue/queue.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Table {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Queue, queue => queue.table)
  @JoinColumn({ name: 'id' })
  queue: Queue[];

  @Column()
  date_create: Date

  @Column()
  date_last_edit: Date

  @Column()
  @IsNotEmpty()
  deleted: boolean

}
