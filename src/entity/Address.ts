import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  Street_address: string;

  @Column({type: 'varchar'})
  City: string;

  @Column({type: 'varchar'})
  Postal_code: string;
}
