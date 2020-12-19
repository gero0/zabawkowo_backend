import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Address extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  street_address: string;

  @Column({type: 'varchar', nullable: false})
  city: string;

  @Column({type: 'varchar', nullable: false})
  postal_code: string;

  @ManyToOne(()=> User, (user) => user.addresses)
  user_id: number;
}
