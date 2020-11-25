import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  Street_address: string;

  @Column({type: 'varchar', nullable: false})
  City: string;

  @Column({type: 'varchar', nullable: false})
  Postal_code: string;
}
