import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResetRequest extends BaseEntity{

  @PrimaryColumn({type: 'varchar'})
  uuid: string;

  @Column({type: 'varchar', nullable: false})
  expiration_date: Date;

  @Column({type: 'int', nullable:false})
  user_id: number;
}