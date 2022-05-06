import { IsNotEmpty, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food_Delivery {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({ unique: true })
    @IsNotEmpty()
    @IsString()
    color: string;

    @OneToMany(() => Order, order => order.delivery)
    @JoinColumn({ name: 'name' })
    Order: Order;

}
