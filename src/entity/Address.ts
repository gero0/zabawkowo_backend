import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({type: 'int', nullable: false})
  user_id: number;
}
