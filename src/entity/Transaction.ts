import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Payment_Status {
  Accepted = 'Accepted',
  Pending = 'Pending',
  Cancelled = 'Cancelled'
}

@Entity()
export class Transaction extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int', nullable:false})
  user_id_seller: number;

  @Column({type: 'int', nullable:false})
  user_id_buyer: number;

  @Column({type: 'int', nullable:false})
  toy_id: number;

  @Column({type: 'date', nullable:false})
  transaction_started_date: Date;

  @Column({type: 'date', nullable:true})
  transaction_finished_date: Date;

  @Column({type: 'enum', enum:Payment_Status, nullable:false})
  payment_status: string;
}