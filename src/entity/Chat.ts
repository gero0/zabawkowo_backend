import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int', nullable:false})
  User_id_1: number;

  @Column({type: 'int', nullable:false})
  User_id_2: number;
}